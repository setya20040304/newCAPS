<?php

class Daftar_Perbaikan extends Controller
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['role'])) {
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    }

    public function index()
    {
        if ($_SESSION['role'] === 'pelanggan') {
            $this->view('templates/header');
            $this->view('daftar_perbaikan/index', ['user_role' => $_SESSION['role']]);
            $this->view('templates/footer');
        } elseif ($_SESSION['role'] === 'admin') {
            $data['perbaikan'] = $this->model('Perbaikan_model')->getAllPerbaikan();
            $this->view('templates/header');
            $this->view('daftar_perbaikan/admin_view', $data);
            $this->view('templates/footer');
        }
    }

    public function submit()
    {
        if ($_SESSION['role'] === 'pelanggan') {
            $result = $this->model('Perbaikan_model')->insertPerbaikan($_POST, $_SESSION['user_id']);
            if ($result) {
                $_SESSION['success'] = 'Form berhasil dikirim!';
            } else {
                $_SESSION['error'] = 'Gagal mengirim form.';
            }
            header('Location: ' . BASEURL . '/daftar_perbaikan');
        } else {
            header('Location: ' . BASEURL . '/login');
        }
    }

    public function updateStatus($id)
    {
        if ($_SESSION['role'] === 'admin') {
            $result = $this->model('Perbaikan_model')->updateStatus($id, $_POST['status']);
            if ($result) {
                $_SESSION['success'] = 'Status berhasil diperbarui.';
            } else {
                $_SESSION['error'] = 'Gagal memperbarui status.';
            }
            header('Location: ' . BASEURL . '/daftar_perbaikan');
        } else {
            header('Location: ' . BASEURL . '/login');
        }
    }

    public function delete($id)
    {
        if ($_SESSION['role'] === 'admin') {
            $result = $this->model('Perbaikan_model')->deletePerbaikan($id);
            if ($result) {
                $_SESSION['success'] = 'Data berhasil dihapus.';
            } else {
                $_SESSION['error'] = 'Gagal menghapus data.';
            }
            header('Location: ' . BASEURL . '/daftar_perbaikan');
        } else {
            header('Location: ' . BASEURL . '/login');
        }
    }


    public function store()
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Pastikan user login
        if (!isset($_SESSION['user_id'])) {
            die('Error: User not logged in.');
        }

        // Ambil data dari form
        $data = [
            'id_Pelanggan' => $_SESSION['user_id'],
            'Tanggal_Transaksi' => $_POST['Tanggal_Transaksi'] ?? date('Y-m-d'),
            'total_harga' => 0, // Nilai default, bisa diperbarui nanti
            'status' => 'pending', // Status default
            'tanggal_selesai' => null, // Nilai default null
            'category_permasalahan' => $_POST['category_permasalahan'] ?? '',
            'tipe_permasalahan' => $_POST['tipe_permasalahan'] ?? '',
            'deskripsi_permasalahan' => $_POST['deskripsi_permasalahan'] ?? '',
        ];

        // Simpan data ke model
        $model = $this->model('Perbaikan_model');

        if ($model->insertTransaksi($data)) {
            $_SESSION['success'] = 'Data berhasil disimpan.';
        } else {
            $_SESSION['error'] = 'Gagal menyimpan data.';
        }

        // Redirect kembali ke halaman daftar perbaikan
        header('Location: ' . BASEURL . '/daftar_perbaikan');
        exit;
    }
}
}