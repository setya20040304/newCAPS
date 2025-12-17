<?php

class Prices extends Controller{
    public function index(){
        $this->view('templates/header');
        $this->view('templates/footer');
        $this->view('prices/index');
    }

}