<?php
class Detail_model
{
    
    private $db;

    public function __construct()
    {
        $this->db = new Database; // Pastikan Anda memiliki class Database
    }

    public function getTransaksiById($id_Transaksi)
{
    $this->db->query("SELECT * FROM transaksi WHERE id_Transaksi = :id_Transaksi");
    $this->db->bind('id_Transaksi', $id_Transaksi);
    
    $result = $this->db->single();

    if (!$result) {
        error_log("Query gagal untuk id_Transaksi: $id_Transaksi");
    }
    return $result;
}

}
