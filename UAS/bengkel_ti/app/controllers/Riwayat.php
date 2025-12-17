<?php
session_start();

class Riwayat extends Controller {
    public function index() {
        // Cek role pengguna
        if ($_SESSION['role'] === 'pelanggan') {
            // Ambil id pengguna dari sesi
            $id_user = $_SESSION['user_id'];
        
            // Pastikan id_user valid
            if ($id_user) {
                $data['riwayat'] = $this->model('Riwayat_model')->getRiwayatForPelanggan($id_user);
            } else {
                $data['riwayat'] = [];
                $data['error'] = 'ID user tidak ditemukan.';
            }
        } else {
            // Jika bukan pelanggan, tampilkan semua riwayat
            $data['riwayat'] = $this->model('Riwayat_model')->getAllRiwayat();
        }
        
        // Render view
        $this->view('templates/header');
        $this->view('riwayat/index', $data);
        $this->view('templates/footer');
    }
    
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id_Transaksi = $_POST['id_Transaksi'] ?? null;
    
            if (!$id_Transaksi) {
                $_SESSION['error'] = 'ID Transaksi tidak ditemukan.';
                header('Location: ' . BASEURL . '/riwayat');
                exit;
            }
    
            // Data untuk update
            $data = [
                'id_Transaksi' => $id_Transaksi,
                'total_harga' => $_POST['total_harga'] ?? null,
                'status' => $_POST['status'] ?? null,
                'tanggal_selesai' => $_POST['tanggal_selesai'] ?? null,
            ];
    
            // Validasi data
            if (empty($data['status']) || empty($data['tanggal_selesai']) || empty($data['total_harga'])) {
                $_SESSION['error'] = 'Semua data wajib diisi.';
                header('Location: ' . BASEURL . '/riwayat');
                exit;
            }
    
            // Simpan ke database
            $model = $this->model('Riwayat_model');
            if ($model->updateStatus($data)) {
                $_SESSION['success'] = 'Data berhasil diperbarui.';
            } else {
                $_SESSION['error'] = 'Gagal memperbarui data.';
            }
    
            header('Location: ' . BASEURL . '/riwayat');
            exit;
        } else {
            $_SESSION['error'] = 'Metode tidak diizinkan.';
            header('Location: ' . BASEURL . '/riwayat');
            exit;
        }
    }
    
    
    
    

    public function delete($id_Transaksi) {
        if ($_SESSION['role'] === 'pelanggan') {
            // Tampilkan pesan error atau redirect
            header('Location: ' . BASEURL . '/riwayat');
            exit;
        }

        $this->model('Riwayat_model')->deleteRiwayat($id_Transaksi);
        header('Location: ' . BASEURL . '/riwayat');
    }
    public function pelanggan() {
        // Pastikan pengguna adalah pelanggan
        if ($_SESSION['role'] !== 'pelanggan') {
            header('Location: ' . BASEURL . '/unauthorized');
            exit;
        }
    
        // Ambil id_Pelanggan dari session
        $id_Pelanggan = $_SESSION['user_id'];
    
        // Periksa apakah id_Pelanggan tersedia
        if (!$id_Pelanggan) {
            die("ID pelanggan tidak ditemukan. Silakan login ulang.");
        }
    
        // Ambil riwayat transaksi berdasarkan id_Pelanggan
        $data['riwayat'] = $this->model('Riwayat_model')->getRiwayatForPelanggan($id_Pelanggan);
    
        // Cek apakah data ditemukan
        if (empty($data['riwayat'])) {
            $data['pesan'] = "Belum ada transaksi untuk pelanggan ini.";
        }
    
        // Render view
        $this->view('templates/header');
        $this->view('riwayat/khusus_pelanggan', $data);
        $this->view('templates/footer');
    }
    
}
