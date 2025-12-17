<?php

class Perbaikan_model
{
    private $table = 'transaksi';
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function insertTransaksi($data)
{
    $query = "INSERT INTO transaksi 
        (id_Pelanggan, Tanggal_Transaksi, total_harga, status, tanggal_selesai, category_permasalahan, tipe_permasalahan, deskripsi_permasalahan)
        VALUES 
        (:id_Pelanggan, :Tanggal_Transaksi, :total_harga, :status, :tanggal_selesai, :category_permasalahan, :tipe_permasalahan, :deskripsi_permasalahan)";

    $this->db->query($query);
    $this->db->bind('id_Pelanggan', $data['id_Pelanggan']);
    $this->db->bind('Tanggal_Transaksi', $data['Tanggal_Transaksi']);
    $this->db->bind('total_harga', $data['total_harga']);
    $this->db->bind('status', $data['status']);
    // Gunakan nilai default jika tanggal_selesai NULL
    $this->db->bind('tanggal_selesai', $data['tanggal_selesai'] ?? '0000-00-00');
    $this->db->bind('category_permasalahan', $data['category_permasalahan']);
    $this->db->bind('tipe_permasalahan', $data['tipe_permasalahan']);
    $this->db->bind('deskripsi_permasalahan', $data['deskripsi_permasalahan']);

    return $this->db->execute();
}

    public function getAllPerbaikan()
    {
        $this->db->query("SELECT * FROM $this->table");
        return $this->db->resultSet();
    }

    public function updateStatus($id, $status)
    {
        $query = "UPDATE $this->table SET status = :status WHERE id = :id";
        $this->db->query($query);
        $this->db->bind(':status', $status);
        $this->db->bind(':id', $id);
        return $this->db->execute();
    }

    public function deletePerbaikan($id)
    {
        $query = "DELETE FROM $this->table WHERE id = :id";
        $this->db->query($query);
        $this->db->bind(':id', $id);
        return $this->db->execute();
    }
}