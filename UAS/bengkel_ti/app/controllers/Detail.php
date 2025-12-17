<?php
class Detail extends Controller

    {
        public function index($id_Transaksi)
        {
            // Log nilai id_Transaksi
            error_log("id_Transaksi diterima: $id_Transaksi");
    
            $data['transaksi'] = $this->model('Detail_model')->getTransaksiById($id_Transaksi);
    
            if (!$data['transaksi']) {
                error_log("Data transaksi tidak ditemukan untuk id_Transaksi: $id_Transaksi");
            }
    
            $this->view('detail/index', $data);
        }
    }


