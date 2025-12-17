<?php
session_start();

class Catatan extends Controller {

    private $catatanModel;

    public function __construct() {
        // Load model
        $this->catatanModel = $this->model('Catatan_model');
    }

    public function index() {
        // Ambil data dari model
        $catatan = $this->catatanModel->getAllCatatan();

        // Render view dengan data
        $this->view('templates/header');
        $this->view('catatan/index', ['catatan' => $catatan]);
        $this->view('templates/footer');
    }
}
