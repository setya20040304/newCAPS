<?php

class Rating extends Controller{
    public function index(){
        $this->view('templates/header');
        $this->view('templates/footer');
        $this->view('rating/index');
    }
}