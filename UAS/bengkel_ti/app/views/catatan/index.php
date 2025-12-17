<!-- catatan/index.php -->
<div class="container">
    <h1>Catatan Transaksi</h1>

    <?php if (empty($data['catatan'])): ?>
        <p>Belum ada catatan transaksi.</p>
    <?php else: ?>
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>ID Transaksi</th>
                    <th>Username</th>
                    <th>Status Lama</th>
                    <th>Status Baru</th>
                    <th>Tanggal Selesai Lama</th>
                    <th>Tanggal Selesai Baru</th>
                    <th>Aksi</th>
                    <th>Waktu Update</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($data['catatan'] as $index => $log): ?>
                    <tr>
                        <td><?= $index + 1 ?></td>
                        <td><?= htmlspecialchars($log['id_Transaksi']) ?></td>
                        <td><?= htmlspecialchars($log['username']) ?></td>
                        <td><?= htmlspecialchars($log['old_status']) ?></td>
                        <td><?= htmlspecialchars($log['new_status']) ?></td>
                        <td><?= htmlspecialchars($log['old_tanggal_selesai']) ?></td>
                        <td><?= htmlspecialchars($log['new_tanggal_selesai']) ?></td>
                        <td><?= htmlspecialchars($log['aksi']) ?></td>
                        <td><?= htmlspecialchars($log['updated_at']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
<footer>
  <div class="links">
    <a href="#">Home</a>
    <a href="#">Tentang Kami</a></li>
    <a href="<?= BASEURL; ?>/prices">Katalog Harga</a>
    <a href="<?= BASEURL; ?>/rating">Testimoni</a></li>
    <a href="<?= BASEURL; ?>/login">Login</a></li>
  </div>
  <div class="credit">
    <p>Created By, <a href="">Muhammad Rafi Aditya & Jauhan Ahmad</a>. | &copy; 2025.</a></p>
  </div>
</footer>
<style>
    /* Reset beberapa default gaya */

body {
    background-image: url(../public/img/dark-wooden.jpg) ;
}

/* Judul halaman */
h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
}

/* Tabel */
.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 50px;
}

.table th, .table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
}

.table th {
    background-color: #2c3e50;
    color: #fff;
    font-weight: bold;
}

.table tr:hover {
    background-color: black;
}

/* Pesan jika tidak ada data */
p {
    text-align: center;
    font-size: 18px;
    color: #7f8c8d;
}

footer {
  background-color: #e07b39;
  text-align: center;
  padding: 0.7rem 1rem;
  margin-top: 3rem;
}

footer .links {
  margin-bottom: 0.4rem;
}

footer .links a {
  color: #fff;
  padding: 0.1rem 1rem;
}

footer .credit {
  font-size: 0.8rem;
}

footer .credit p{
    color: #fff;
    font-size: 0.8rem;
}

footer .credit a {
  color: #010101;
  font-weight: 700;
}


</style>