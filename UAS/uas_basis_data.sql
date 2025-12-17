-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Jan 2025 pada 13.26
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas_basis_data`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `catatan`
--

CREATE TABLE `catatan` (
  `id_Transaksi` int(11) DEFAULT NULL,
  `id_Pelanggan` int(11) DEFAULT NULL,
  `Tanggal_Transaksi` date DEFAULT NULL,
  `total_harga` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `category_permasalahan` varchar(100) DEFAULT NULL,
  `tipe_permasalahan` varchar(100) DEFAULT NULL,
  `deskripsi_permasalahan` text DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `aksi` varchar(50) DEFAULT NULL,
  `waktu` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `catatan`
--

INSERT INTO `catatan` (`id_Transaksi`, `id_Pelanggan`, `Tanggal_Transaksi`, `total_harga`, `status`, `tanggal_selesai`, `category_permasalahan`, `tipe_permasalahan`, `deskripsi_permasalahan`, `username`, `aksi`, `waktu`) VALUES
(21, 2, '2025-01-21', '0.00', 'pending', '0000-00-00', 'Perawatan', 'PC', 'lcd pecah', 'Jauhan', 'CREATE', '2025-01-21 04:02:06'),
(18, 2, '2025-01-20', '40000.00', 'batal', '2025-01-21', 'Perbaikan', 'Laptop', 'qwe', 'Jauhan', 'UPDATE', '2025-01-21 04:03:40'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 04:03:48'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 04:03:49'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 04:03:55'),
(21, 2, '2025-01-21', '0.00', 'pending', '0000-00-00', 'Perawatan', 'PC', 'lcd pecah', 'Jauhan', 'DELETE', '2025-01-21 04:11:31'),
(22, 2, '2025-01-21', '600000.00', 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'keyboard', 'Jauhan', 'CREATE', '2025-01-21 04:26:26'),
(23, 2, '2025-01-21', '0.00', 'pending', '0000-00-00', 'Perawatan', 'Laptop', 'kipas dalam', 'Jauhan', 'CREATE', '2025-01-21 04:26:35'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 06:01:28'),
(19, 2, '2025-01-20', '15000.00', 'batal', '2025-01-21', 'Perawatan', 'PC', 'qwewr', 'Jauhan', 'UPDATE', '2025-01-21 07:14:45'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 07:14:47'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 07:14:47'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 07:14:48'),
(18, 2, '2025-01-20', '40000.00', 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'qwe', 'Jauhan', 'UPDATE', '2025-01-21 07:14:50'),
(19, 2, '2025-01-20', '15000.00', 'batal', '2025-01-21', 'Perawatan', 'PC', 'qwewr', 'Jauhan', 'UPDATE', '2025-01-21 07:56:34'),
(17, 2, '2025-01-20', '25000.00', 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we', 'Jauhan', 'UPDATE', '2025-01-21 11:37:37'),
(23, 2, '2025-01-21', '120000.00', 'selesai', '2025-01-21', 'Perawatan', 'Laptop', 'kipas dalam', 'Jauhan', 'UPDATE', '2025-01-21 11:45:34'),
(22, 2, '2025-01-21', '125000.00', 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'keyboard', 'Jauhan', 'UPDATE', '2025-01-21 11:46:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `log_transaksi`
--

CREATE TABLE `log_transaksi` (
  `id_Transaksi` int(11) NOT NULL,
  `id_Pelanggan` int(11) NOT NULL,
  `Tanggal_Transaksi` date NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `status` enum('pending','selesai','batal') NOT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `category_permasalahan` varchar(100) DEFAULT NULL,
  `tipe_permasalahan` varchar(100) DEFAULT NULL,
  `deskripsi_permasalahan` text DEFAULT NULL,
  `nama_pelanggan` varchar(100) DEFAULT NULL,
  `old_status` varchar(100) DEFAULT NULL,
  `new_status` varchar(100) DEFAULT NULL,
  `old_tanggal_selesai` varchar(100) DEFAULT NULL,
  `new_tanggal_selesai` varchar(100) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `log_transaksi`
--

INSERT INTO `log_transaksi` (`id_Transaksi`, `id_Pelanggan`, `Tanggal_Transaksi`, `total_harga`, `status`, `tanggal_selesai`, `category_permasalahan`, `tipe_permasalahan`, `deskripsi_permasalahan`, `nama_pelanggan`, `old_status`, `new_status`, `old_tanggal_selesai`, `new_tanggal_selesai`, `updated_by`) VALUES
(22, 0, '0000-00-00', '0.00', 'pending', NULL, NULL, NULL, NULL, NULL, 'pending', 'selesai', '0000-00-00', '2025-01-21', 'root@localhost'),
(23, 0, '0000-00-00', '0.00', 'pending', NULL, NULL, NULL, NULL, NULL, 'pending', 'selesai', '0000-00-00', '2025-01-21', 'root@localhost');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_Pelanggan` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_telepon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_Transaksi` int(100) NOT NULL,
  `id_Pelanggan` int(100) NOT NULL,
  `Tanggal_Transaksi` date NOT NULL,
  `total_harga` int(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `category_permasalahan` varchar(50) DEFAULT NULL,
  `tipe_permasalahan` varchar(100) DEFAULT NULL,
  `deskripsi_permasalahan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_Transaksi`, `id_Pelanggan`, `Tanggal_Transaksi`, `total_harga`, `status`, `tanggal_selesai`, `category_permasalahan`, `tipe_permasalahan`, `deskripsi_permasalahan`) VALUES
(17, 2, '2025-01-20', 25000, 'selesai', '2025-01-20', 'Perbaikan', 'PC', 'we'),
(18, 2, '2025-01-20', 40000, 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'qwe'),
(19, 2, '2025-01-20', 15000, 'batal', '2025-01-21', 'Perawatan', 'PC', 'qwewr'),
(22, 2, '2025-01-21', 125000, 'selesai', '2025-01-21', 'Perbaikan', 'Laptop', 'keyboard'),
(23, 2, '2025-01-21', 120000, 'selesai', '2025-01-21', 'Perawatan', 'Laptop', 'kipas dalam');

--
-- Trigger `transaksi`
--
DELIMITER $$
CREATE TRIGGER `after_transaksi_delete` AFTER DELETE ON `transaksi` FOR EACH ROW BEGIN
    DECLARE user_name VARCHAR(100);
    -- Ambil username dari tabel users
    SELECT username INTO user_name 
    FROM users 
    WHERE id = OLD.id_Pelanggan;

    -- Masukkan data ke tabel catatan
    INSERT INTO catatan (
        id_Transaksi, id_Pelanggan, Tanggal_Transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) 
    VALUES (
        OLD.id_Transaksi, OLD.id_Pelanggan, OLD.Tanggal_Transaksi, OLD.total_harga, OLD.status, 
        OLD.tanggal_selesai, OLD.category_permasalahan, OLD.tipe_permasalahan, 
        OLD.deskripsi_permasalahan, user_name, 'DELETE'
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_transaksi_insert` AFTER INSERT ON `transaksi` FOR EACH ROW BEGIN
    DECLARE user_name VARCHAR(100);
    -- Ambil username dari tabel users
    SELECT username INTO user_name 
    FROM users 
    WHERE id = NEW.id_Pelanggan;

    -- Masukkan data ke tabel catatan
    INSERT INTO catatan (
        id_Transaksi, id_Pelanggan, Tanggal_Transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) 
    VALUES (
        NEW.id_Transaksi, NEW.id_Pelanggan, NEW.Tanggal_Transaksi, NEW.total_harga, NEW.status, 
        NEW.tanggal_selesai, NEW.category_permasalahan, NEW.tipe_permasalahan, 
        NEW.deskripsi_permasalahan, user_name, 'CREATE'
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_transaksi_update` AFTER UPDATE ON `transaksi` FOR EACH ROW BEGIN
    DECLARE user_name VARCHAR(100);
    -- Ambil username dari tabel users
    SELECT username INTO user_name 
    FROM users 
    WHERE id = NEW.id_Pelanggan;

    -- Masukkan data ke tabel catatan
    INSERT INTO catatan (
        id_Transaksi, id_Pelanggan, Tanggal_Transaksi, total_harga, status, tanggal_selesai,
        category_permasalahan, tipe_permasalahan, deskripsi_permasalahan, username, aksi
    ) 
    VALUES (
        NEW.id_Transaksi, NEW.id_Pelanggan, NEW.Tanggal_Transaksi, NEW.total_harga, NEW.status, 
        NEW.tanggal_selesai, NEW.category_permasalahan, NEW.tipe_permasalahan, 
        NEW.deskripsi_permasalahan, user_name, 'UPDATE'
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_transaksi` AFTER UPDATE ON `transaksi` FOR EACH ROW BEGIN
    DECLARE nama_pelanggan VARCHAR(255);

    -- Ambil nama pelanggan dari tabel pelanggan
    SELECT nama INTO nama_pelanggan
    FROM pelanggan
    WHERE pelanggan.id_Pelanggan = NEW.id_Pelanggan;

    -- Periksa apakah status atau tanggal_selesai berubah
    IF OLD.status != NEW.status OR OLD.tanggal_selesai != NEW.tanggal_selesai THEN
        INSERT INTO log_transaksi (
            id_Transaksi, 
            nama_pelanggan, 
            old_status, 
            new_status, 
            old_tanggal_selesai, 
            new_tanggal_selesai, 
            updated_by
        )
        VALUES (
            NEW.id_Transaksi,
            nama_pelanggan,
            OLD.status,
            NEW.status,
            OLD.tanggal_selesai,
            NEW.tanggal_selesai,
            USER() -- USER() akan mencatat pengguna basis data saat ini
        );
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `password` varchar(225) NOT NULL,
  `role` varchar(100) NOT NULL,
  `Created_at` date NOT NULL,
  `Update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `Email`, `password`, `role`, `Created_at`, `Update_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '0192023a7bbd73250516f069df18b500', 'admin', '2025-01-16', '2025-01-16'),
(2, 'Jauhan', 'Jauhan@gmail.com', '89f225f1d7973f06d06a88c07e6afcab', 'pelanggan', '2025-01-16', '2025-01-16'),
(3, 'Rafi', 'Rafi@gmail.com', '85c473091c49a4e9cd3aa840ad75f1cd', 'pelanggan', '2025-01-16', '2025-01-16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `log_transaksi`
--
ALTER TABLE `log_transaksi`
  ADD PRIMARY KEY (`id_Transaksi`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_Pelanggan`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_Transaksi`),
  ADD KEY `fk_id_pelanggan` (`id_Pelanggan`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `log_transaksi`
--
ALTER TABLE `log_transaksi`
  MODIFY `id_Transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_Pelanggan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_Transaksi` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_id_pelanggan` FOREIGN KEY (`id_Pelanggan`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
