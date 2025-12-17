<?php

class Pelanggan_model {
    private $table = 'users';
    private $db;

    public function __construct() {
        $this->db = new Database;
    }

    public function getUserByUsername($username) {
        $this->db->query("SELECT * FROM $this->table WHERE username = :username AND role = 'pelanggan'");
        $this->db->bind(':username', $username);
        return $this->db->single();
    }

    public function registerUser($data) {
        $query = "INSERT INTO $this->table (username, email, password, role) VALUES (:username, :email, :password, 'pelanggan')";

        $this->db->query($query);
        $this->db->bind(':username', $data['username']);
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':password', md5($data['password'])); // Gunakan MD5 untuk hashing

        return $this->db->execute();
    }
}
