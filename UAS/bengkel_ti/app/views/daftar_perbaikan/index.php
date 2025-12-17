<!-- Daftar Perbaikan Section Start -->
<section class="daftar-perbaikan">
    <div class="container">
        <h2>Form Pengisian Daftar Perbaikan</h2>
        <form action="<?= BASEURL; ?>/Daftar_perbaikan/store" method="POST">
            
            <!-- Kategori Permasalahan -->
            <div class="form-group">
                <label for="category_permasalahan" class="form-label">Kategori Permasalahan:</label>
                <select id="category_permasalahan" name="category_permasalahan" class="form-select" required>
                    <option value="">-- Pilih Kategori Permasalahan --</option>
                    <option value="Perawatan">Perawatan</option>
                    <option value="Perbaikan">Perbaikan</option>
                </select>
            </div>

            <!-- Tipe Permasalahan -->
            <div class="form-group">
                <label for="tipe_permasalahan" class="form-label">Tipe Permasalahan:</label>
                <select id="tipe_permasalahan" name="tipe_permasalahan" class="form-select" required>
                    <option value="">-- Pilih Tipe Permasalahan --</option>
                    <option value="Laptop">Laptop</option>
                    <option value="PC">PC</option>
                </select>
            </div>

            <!-- Deskripsi Permasalahan -->
            <div class="form-group">
                <label for="deskripsi_permasalahan" class="form-label">Deskripsi Permasalahan:</label>
                <textarea id="deskripsi_permasalahan" name="deskripsi_permasalahan" class="form-textarea" rows="4" required></textarea>
            </div>

            <!-- Tanggal Transaksi -->
            <div class="form-group">
                <label for="Tanggal_Transaksi" class="form-label">Tanggal Transaksi:</label>
                <input type="date" id="Tanggal_Transaksi" name="Tanggal_Transaksi" class="form-input" required />
            </div>



            <!-- Submit Button -->
            <div class="form-group">
                <button type="submit" class="form-button">Submit</button>
            </div>
        </form>
    </div>
    
</section>
<!-- Daftar Perbaikan Section End -->
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
    .daftar-perbaikan {
  background-color: #ffffff;
  padding: 30px;
  margin-top: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.daftar-perbaikan h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Form elements */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  margin-top: 5px;
}

.form-group input[type="date"],
.form-group textarea {
  max-width: 90%;
}

.form-group textarea {
  resize: vertical;
}

.form-group select {
  cursor: pointer;
}

.form-group button {
  background-color: #e07b39;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  width: 92%;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.form-group button:hover {
  background-color: #ce5d12;
}

/* Footer styling */
footer {
  background-color: #333;
  color: white;
  padding: 10px 0;
  text-align: center;
  margin-top: 30px;
}

footer p {
  font-size: 14px;
}

.container {
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container {
    width: 90%;
  }

  .navbar .navigation li {
    display: block;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea,
  .form-group button {
    font-size: 16px;
  }
}

/* Overlay (Latar Belakang) */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Latar belakang transparan */
    z-index: 1001;
}

/* Popup Container */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 320px;
    z-index: 1002;
}

/* Popup Content */
.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Check Icon */
.check-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.check-icon svg {
    width: 50px;
    height: 50px;
    stroke: white;
}

/* Text dalam Popup */
.popup-content p {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

/* Tombol OK */
.btn-ok {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px;
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
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let category = document.getElementById("category_permasalahan").value;
        let type = document.getElementById("tipe_permasalahan").value;
        let description = document.getElementById("deskripsi_permasalahan").value.trim();
        let date = document.getElementById("Tanggal_Transaksi").value;

        if (category === "" || type === "" || description === "" || date === "") {
            event.preventDefault(); // Mencegah form dikirim jika ada yang kosong
            alert("Semua kolom wajib diisi!");
            return;
        }

        // Menampilkan popup sukses
        event.preventDefault();  // Hentikan form sementara untuk menampilkan popup
        document.body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
        
        let popup = document.createElement("div");
        popup.id = "popup-container";
        popup.className = "popup";
        popup.innerHTML = `
            <div class="popup-content">
                <p style="font-size: 20px; font-weight: bold;">Data telah dikirim!</p>
                <button id="popup-ok" class="btn-ok">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
        document.body.classList.add('overlay-active');

        // Tunggu hingga tombol OK ditekan, lalu submit form
        document.getElementById("popup-ok").addEventListener("click", function () {
            document.getElementById("popup-container").remove();
            document.querySelector(".overlay").remove();
            document.body.classList.remove('overlay-active');
            form.submit();  // Kirim form setelah popup ditutup
        });
    });
});

</script>