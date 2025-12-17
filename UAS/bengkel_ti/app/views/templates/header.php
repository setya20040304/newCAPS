<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bengkel TI Unida</title>
    <link rel="stylesheet" href="<?= BASEURL; ?>/css/main.css" />
  </head>
  <body>
  <?php 
      // Pastikan session dimulai di awal skrip
      if (session_status() === PHP_SESSION_NONE) {
          session_start();
      }
    ?>
    <!-- Navbar Section Start -->
    <?php 
// Pastikan session dimulai di awal skrip
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Menentukan role pengguna
$role = $_SESSION['role'] ?? 'guest';
?>

<nav class="navbar">
  <style>.navbar { background-color: black; }</style>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
  <style>
    .navbar {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
    }</style>
  <p class="logo">#BengkelLaptop<span style="color: #e07b39;">TI.</span></p>
  <div class="container">
    <ul class="navigation">
      <?php if ($role === 'admin'): ?>
        <li><a href="<?= BASEURL; ?>/login/logout" class="logout-button">Logout</a></li>
        <li><a href="<?= BASEURL; ?>/riwayat">Riwayat</a></li>
        <li><a href="<?= BASEURL; ?>/catatan">Catatan</a></li>
      <?php elseif ($role === 'pelanggan'): ?>
        <li><a href="<?= BASEURL; ?>/login/logout" class="logout-button">Logout</a></li>
        <li><a href="<?= BASEURL; ?>/riwayat">Riwayat</a></li>
        <li><a href="<?= BASEURL; ?>/catatan">Catatan</a></li>
        <li><a href="<?= BASEURL; ?>/daftar_perbaikan">Daftar Perbaikan</a></li>
      <?php endif; ?>
      <!-- Tampilkan link login hanya untuk guest -->
      <?php if ($role === 'guest'): ?>
        <li><a href="<?= BASEURL; ?>/login">Login</a></li>
      <?php endif; ?>
      <!-- Menu untuk semua pengguna termasuk guest -->
      <li><a href="<?= BASEURL; ?>/rating">Testimoni</a></li>
      <li><a href="<?= BASEURL; ?>/prices">Katalog Harga</a></li>
      <li><a href="<?= BASEURL; ?>/about">Tentang Kami</a></li>
      <li><a href="<?= BASEURL; ?>/home">Home</a></li>


    </ul>
  </div>
</nav>

<!-- Navbar Section End -->

  </body>
</html>