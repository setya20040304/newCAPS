<?php
class Login extends Controller {
    public function index() {
        // Menampilkan halaman login
        $this->view('templates/footer');
        $this->view('login/index');
    }

    public function authenticate() {
        session_start();

        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        $role = $_POST['role'] ?? '';

        if (empty($username) || empty($password) || empty($role)) {
            $_SESSION['error'] = 'Semua field harus diisi.';
            header('Location: ' . BASEURL . '/login');
            exit;
        }

        $user = null;
        if ($role === 'admin') {
            $user = $this->model('Admin_model')->getUserByUsername($username);
        } elseif ($role === 'pelanggan') {
            $user = $this->model('Pelanggan_model')->getUserByUsername($username);
        } else {
            $_SESSION['error'] = 'Role tidak valid.';
            header('Location: ' . BASEURL . '/login');
            exit;
        }

        $hashedPassword = md5($password);
        if ($user && $user['password'] === $hashedPassword) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            header('Location: ' . BASEURL . '/home');
            exit;
        } else {
            $_SESSION['error'] = 'Username atau password salah.';
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    }

    public function logout() {
        session_start();
        session_unset();
        session_destroy();

        header('Location: ' . BASEURL . '/home');
        exit;
    }

    public function register() {
        $this->view('templates/footer');
        $this->view('login/register');
    }

    public function store() {
        session_start();
    
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
    
        if (empty($username) || empty($email) || empty($password)) {
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    
        $pelangganModel = $this->model('Pelanggan_model');
    
        // Cek apakah username sudah terdaftar
        if ($pelangganModel->getUserByUsername($username)) {
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    
        // Simpan data pelanggan baru
        if ($pelangganModel->registerUser(['username' => $username, 'email' => $email, 'password' => $password])) {
            header('Location: ' . BASEURL . '/login');
            exit;
        } else {
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    }
    
}
