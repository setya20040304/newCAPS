<?php

class Riwayat_model {
    private $table = 'transaksi';
    private $pdo;

    private $db;

    public function __construct() {
        // Menghubungkan ke database
        $this->db = new Database; // Pastikan class Database sudah ada
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=uas_basis_data", "root", "");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    
        // Menetapkan nama tabel yang digunakan
        $this->table = 'transaksi';  // Pastikan mengarah ke tabel 'transaksi'
    }
    


    // Mengupdate status transaksi
    public function updateStatus($data) {
        // Query update untuk tabel transaksi
        $query = "UPDATE " . $this->table . " SET 
            total_harga = :total_harga,
            status = :status,
            tanggal_selesai = :tanggal_selesai
          WHERE id_Transaksi = :id_Transaksi";
    
        // Menyiapkan query
        $this->db->query($query);
    
        // Binding parameter
        $this->db->bind('total_harga', $data['total_harga']);
        $this->db->bind('status', $data['status']);
        $this->db->bind('tanggal_selesai', $data['tanggal_selesai']);
        $this->db->bind('id_Transaksi', $data['id_Transaksi']);
    
        // Debugging sebelum eksekusi
        try {
            // Eksekusi query
            $this->db->execute();
            echo "Query berhasil dieksekusi!<br>";
            echo "Jumlah baris yang terpengaruh: " . $this->db->rowCount();
            return $this->db->rowCount();
        } catch (PDOException $e) {
            // Tangkap error jika ada
            echo "Error saat eksekusi query: " . $e->getMessage();
            die();
        }
    }
    
        // Mendapatkan semua riwayat transaksi
        public function getAllRiwayat() {
            try {
                $query = "SELECT * FROM transaksi";
                $stmt = $this->pdo->prepare($query);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                throw new Exception("Error fetching all transactions: " . $e->getMessage());
            }
        }

    // Menghapus riwayat transaksi
    public function deleteRiwayat($id_Transaksi) {
        try {
            $query = "DELETE FROM transaksi WHERE id_Transaksi = :id_Transaksi";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':id_Transaksi', $id_Transaksi, PDO::PARAM_INT);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception("Error deleting transaction: " . $e->getMessage());
        }
    }

    // Mendapatkan riwayat transaksi untuk pelanggan tertentu

    public function getRiwayatForPelanggan($id_user) {
        try {
            $query = "SELECT t.id_Transaksi, t.id_Pelanggan, t.Tanggal_Transaksi, t.total_harga, t.status, 
                             t.tanggal_selesai, t.category_permasalahan, t.tipe_permasalahan, t.deskripsi_permasalahan
                      FROM transaksi t
                      WHERE t.id_Pelanggan = :id_user";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Error fetching transactions for customer: " . $e->getMessage());
        }
    }
    
    
    
    
    
}

?>
