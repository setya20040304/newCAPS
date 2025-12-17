<section class="riwayat">
    <div class="container">
        <h2>Riwayat Semua Perbaikan</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategori</th>
                    <th>Tipe</th>
                    <th>Deskripsi</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Total Harga</th>
                    <th>Tanggal Selesai</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($data['riwayat'] as $item): ?>
                <tr>
                    <td><?= $item['id_Transaksi']; ?></td>
                    <td><?= $item['category_permasalahan']; ?></td>
                    <td><?= $item['tipe_permasalahan']; ?></td>
                    <td><?= $item['deskripsi_permasalahan']; ?></td>
                    <td><?= $item['Tanggal_Transaksi']; ?></td>
                    <td><?= $item['status'] ?? 'Sedang diproses'; ?></td>
                    <td><?= $item['total_harga'] ?? '-'; ?></td>
                    <td><?= $item['tanggal_selesai'] ?? '-'; ?></td>
                    <td>
                    <?php if ($_SESSION['role'] !== 'pelanggan'): ?>
                        <form action="<?= BASEURL; ?>/riwayat/update/" method="POST">
                            <input type="hidden" name="id_Transaksi" value="<?= $item['id_Transaksi']; ?>">
                            <select name="status" required>
                                <option value="proses" <?= $item['status'] === 'proses' ? 'selected' : ''; ?>>Proses</option>
                                <option value="selesai" <?= $item['status'] === 'selesai' ? 'selected' : ''; ?>>Selesai</option>
                                <option value="batal" <?= $item['status'] === 'batal' ? 'selected' : ''; ?>>Batal</option>
                            </select>
                            <input type="number" name="total_harga" placeholder="Total Harga" value="<?= $item['total_harga'] ?? ''; ?>" required>
                            <input type="date" name="tanggal_selesai" value="<?= $item['tanggal_selesai'] ?? ''; ?>" required>
                            <button type="submit">Update</button>
                        </form>
                        <a href="<?= BASEURL; ?>/riwayat/delete/<?= $item['id_Transaksi']; ?>" onclick="return confirm('Yakin ingin menghapus?')">Delete</a>
                        <a href="<?= BASEURL; ?>/detail/index/<?= $item['id_Transaksi']; ?>" onclick="return confirm('Yakin ingin melihat?')">Nota</a>
                        <?php else: ?>
                        <span>View only</span>
                    <?php endif; ?>

                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<div class="overlay"></div>
<div id="popup" class="popup">
    <div class="popup-content">
        <div class="check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"></path>
            </svg>
        </div>
        <p>Data berhasil diperbarui!</p>
        <button id="popup-ok" class="btn-ok">OK</button>
    </div>
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
/* Gaya untuk section riwayat */
.riwayat {
    margin-top: 50px;
    padding: 20px;
    background-image: url(../public/img/dark-wooden.jpg) ;
    font-family: Arial, sans-serif;
    color: #fff;
}

.riwayat h2 {
    text-align: center;
    color: #444;
    margin-bottom: 20px;
}

/* Gaya untuk container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Gaya untuk tabel */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: transparent;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table th, table td {
    padding: 10px 15px;
    text-align: left;
    border: 1px solid #ddd;
}

table th {
    background-color: #2c3e50;
    color: #fff;
    font-weight: bold;
}

table tr:hover {
    background-color: #000;
}

/* Gaya untuk form dalam tabel */
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form select, form input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}

form button {
    padding: 8px 12px;
    background-color: #e07b39;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

form button:hover {
    background-color: #ce5d12;
}

/* Gaya untuk link */
a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #0056b3;
}

/* Gaya untuk tampilan hanya pelanggan */
span {
    font-style: italic;
    color: #666;
}
/* Overlay (Latar Belakang) */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 1001;
}

/* Popup Container */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 300px;
    display: none;
    z-index: 1002;
}

/* Popup Content */
.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Ikon Centang */
.check-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.check-icon svg {
    width: 40px;
    height: 40px;
    stroke: white;
}

/* Pesan dalam Popup */
.popup-content p {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

/* Tombol OK */
.btn-ok {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 15px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.3s ease;
}

.btn-ok:hover {
    background-color: #388E3C;
}
footer {
  background-color: #e07b39;
  text-align: center;
  padding: 0.7rem 1rem;
  margin-top: 0.1rem;
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

    <script>
    document.addEventListener("DOMContentLoaded", function () {
        const forms = document.querySelectorAll("form");

        forms.forEach(form => {
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Mencegah pengiriman langsung

                // Tampilkan popup
                document.getElementById("popup").style.display = "block";
                document.querySelector(".overlay").style.display = "block";

                setTimeout(() => {
                    form.submit(); // Kirim form setelah popup muncul
                }, 1500);
            });
        });

        // Tutup popup saat tombol OK diklik
        document.getElementById("popup-ok").addEventListener("click", function () {
            document.getElementById("popup").style.display = "none";
            document.querySelector(".overlay").style.display = "none";
        });
    });
</script>
