-- Bersihkan tabel lama jika ada agar tidak bentrok
DROP TABLE IF EXISTS log_transaksi CASCADE;
DROP TABLE IF EXISTS catatan CASCADE;
DROP TABLE IF EXISTS transaksi CASCADE;
DROP TABLE IF EXISTS pelanggan CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Tabel Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(225) NOT NULL,
  role VARCHAR(100) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  update_at DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO users (username, email, password, role, created_at, update_at) VALUES
('Admin', 'admin@gmail.com', '0192023a7bbd73250516f069df18b500', 'admin', '2025-01-16', '2025-01-16'),
('Jauhan', 'Jauhan@gmail.com', '89f225f1d7973f06d06a88c07e6afcab', 'pelanggan', '2025-01-16', '2025-01-16'),
('Rafi', 'Rafi@gmail.com', '85c473091c49a4e9cd3aa840ad75f1cd', 'pelanggan', '2025-01-16', '2025-01-16');

-- 2. Tabel Pelanggan
CREATE TABLE pelanggan (
  id_pelanggan SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  alamat TEXT,
  no_telepon VARCHAR(20)
);

-- 3. Tabel Transaksi
CREATE TABLE transaksi (
  id_transaksi SERIAL PRIMARY KEY,
  id_pelanggan INT NOT NULL,
  tanggal_transaksi DATE NOT NULL,
  total_harga INT NOT NULL,
  status VARCHAR(100) NOT NULL,
  tanggal_selesai DATE,
  category_permasalahan VARCHAR(50),
  tipe_permasalahan VARCHAR(100),
  deskripsi_permasalahan TEXT,
  CONSTRAINT fk_id_pelanggan FOREIGN KEY (id_pelanggan) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO transaksi (id_pelanggan, tanggal_transaksi, total_harga, status, tanggal_selesai, category_permasalahan, tipe_permasalahan, deskripsi_permasalahan) VALUES
(2, '2025-01-20', 25000, 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we'),
(2, '2025-01-20', 40000, 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'qwe'),
(2, '2025-01-20', 15000, 'batal', '2025-01-21', 'Perawatan', 'PC', 'qwewr'),
(2, '2025-01-21', 125000, 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'keyboard'),
(2, '2025-01-21', 120000, 'selesai', '2025-01-21', 'Perawatan', 'Laptop', 'kipas dalam');

-- 4. Tabel Catatan
CREATE TABLE catatan (
  id_transaksi INT,
  id_pelanggan INT,
  tanggal_transaksi DATE,
  total_harga DECIMAL(10,2),
  status VARCHAR(50),
  tanggal_selesai DATE,
  category_permasalahan VARCHAR(100),
  tipe_permasalahan VARCHAR(100),
  deskripsi_permasalahan TEXT,
  username VARCHAR(100),
  aksi VARCHAR(50),
  waktu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Log Transaksi
CREATE TABLE log_transaksi (
  id_transaksi SERIAL PRIMARY KEY,
  id_pelanggan INT NOT NULL,
  tanggal_transaksi DATE NOT NULL,
  total_harga DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending', 'selesai', 'batal')),
  tanggal_selesai DATE,
  category_permasalahan VARCHAR(100),
  tipe_permasalahan VARCHAR(100),
  deskripsi_permasalahan TEXT,
  nama_pelanggan VARCHAR(100),
  old_status VARCHAR(100),
  new_status VARCHAR(100),
  old_tanggal_selesai VARCHAR(100),
  new_tanggal_selesai VARCHAR(100),
  updated_by VARCHAR(100)
);

-- --- TRIGGERS & FUNCTIONS (PostgreSQL Style) ---

-- A. Fungsi & Trigger untuk DELETE Transaksi
CREATE OR REPLACE FUNCTION log_delete_transaksi() RETURNS TRIGGER AS $$
DECLARE
    user_name VARCHAR(100);
BEGIN
    SELECT username INTO user_name FROM users WHERE id = OLD.id_pelanggan;
    
    INSERT INTO catatan (
        id_transaksi, id_pelanggan, tanggal_transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) VALUES (
        OLD.id_transaksi, OLD.id_pelanggan, OLD.tanggal_transaksi, OLD.total_harga, OLD.status, 
        OLD.tanggal_selesai, OLD.category_permasalahan, OLD.tipe_permasalahan, 
        OLD.deskripsi_permasalahan, user_name, 'DELETE'
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_transaksi_delete
AFTER DELETE ON transaksi
FOR EACH ROW EXECUTE FUNCTION log_delete_transaksi();

-- B. Fungsi & Trigger untuk INSERT Transaksi
CREATE OR REPLACE FUNCTION log_insert_transaksi() RETURNS TRIGGER AS $$
DECLARE
    user_name VARCHAR(100);
BEGIN
    SELECT username INTO user_name FROM users WHERE id = NEW.id_pelanggan;

    INSERT INTO catatan (
        id_transaksi, id_pelanggan, tanggal_transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) VALUES (
        NEW.id_transaksi, NEW.id_pelanggan, NEW.tanggal_transaksi, NEW.total_harga, NEW.status, 
        NEW.tanggal_selesai, NEW.category_permasalahan, NEW.tipe_permasalahan, 
        NEW.deskripsi_permasalahan, user_name, 'CREATE'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_transaksi_insert
AFTER INSERT ON transaksi
FOR EACH ROW EXECUTE FUNCTION log_insert_transaksi();

-- C. Fungsi & Trigger untuk UPDATE Transaksi (Menggabungkan logika Update Catatan & Log Status)
CREATE OR REPLACE FUNCTION log_update_transaksi() RETURNS TRIGGER AS $$
DECLARE
    user_name VARCHAR(100);
    nama_pelanggan_val VARCHAR(255);
BEGIN
    -- 1. Log ke tabel catatan (Riwayat perubahan umum)
    SELECT username INTO user_name FROM users WHERE id = NEW.id_pelanggan;
    
    INSERT INTO catatan (
        id_transaksi, id_pelanggan, tanggal_transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) VALUES (
        NEW.id_transaksi, NEW.id_pelanggan, NEW.tanggal_transaksi, NEW.total_harga, NEW.status, 
        NEW.tanggal_selesai, NEW.category_permasalahan, NEW.tipe_permasalahan, 
        NEW.deskripsi_permasalahan, user_name, 'UPDATE'
    );

    -- 2. Log ke tabel log_transaksi (Khusus perubahan status/tanggal)
    IF OLD.status IS DISTINCT FROM NEW.status OR OLD.tanggal_selesai IS DISTINCT FROM NEW.tanggal_selesai THEN
        SELECT nama INTO nama_pelanggan_val FROM pelanggan WHERE id_pelanggan = NEW.id_pelanggan;

        INSERT INTO log_transaksi (
            id_transaksi, id_pelanggan, tanggal_transaksi, total_harga, status, 
            nama_pelanggan, old_status, new_status, old_tanggal_selesai, new_tanggal_selesai, updated_by
        ) VALUES (
            DEFAULT, -- id_transaksi auto increment
            NEW.id_pelanggan, NEW.tanggal_transaksi, NEW.total_harga, NEW.status::varchar, 
            nama_pelanggan_val, OLD.status, NEW.status, 
            COALESCE(OLD.tanggal_selesai::text, '0000-00-00'), 
            COALESCE(NEW.tanggal_selesai::text, '0000-00-00'), 
            CURRENT_USER
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_transaksi_update
AFTER UPDATE ON transaksi
FOR EACH ROW EXECUTE FUNCTION log_update_transaksi();
