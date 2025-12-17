<?php
class Catatan_model {

    private $db;

    public function __construct() {
        $this->db = new Database(); // Pastikan Anda memiliki class Database untuk koneksi ke DB
    }

    public function getAllCatatan() {
        $query = "
    SELECT 
        catatan.id_Transaksi, 
        users.username, 
        catatan.status AS old_status, 
        (SELECT status FROM transaksi WHERE id_Transaksi = catatan.id_Transaksi LIMIT 1) AS new_status, 
        catatan.tanggal_selesai AS old_tanggal_selesai, 
        (SELECT tanggal_selesai FROM transaksi WHERE id_Transaksi = catatan.id_Transaksi LIMIT 1) AS new_tanggal_selesai, 
        catatan.aksi, 
        catatan.waktu AS updated_at 
    FROM catatan 
    LEFT JOIN users ON catatan.id_Pelanggan = users.id 
    ORDER BY catatan.waktu DESC
";


        $this->db->query($query);
        return $this->db->resultSet();
    }
}
