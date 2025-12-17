<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Transaksi</title>
</head>
<body>
    <?php if ($data['transaksi']) : ?>
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>id_Transaksi</th>
                <td><?= $data['transaksi']['id_Transaksi']; ?></td>
            </tr>
            <tr>
                <th>id_Pelanggan</th>
                <td><?= $data['transaksi']['id_Pelanggan']; ?></td>
            </tr>
            <tr>
                <th>Tanggal_Transaksi</th>
                <td><?= $data['transaksi']['Tanggal_Transaksi']; ?></td>
            </tr>
            <tr>
                <th>total_harga</th>
                <td><?= $data['transaksi']['total_harga']; ?></td>
            </tr>
            <tr>
                <th>status</th>
                <td><?= $data['transaksi']['status']; ?></td>
            </tr>
            <tr>
                <th>tanggal_selesai</th>
                <td><?= $data['transaksi']['tanggal_selesai']; ?></td>
            </tr>
            <tr>
                <th>category_permasalahan</th>
                <td><?= $data['transaksi']['category_permasalahan']; ?></td>
            </tr>
            <tr>
                <th>tipe_permasalahan</th>
                <td><?= $data['transaksi']['tipe_permasalahan']; ?></td>
            </tr>
            <tr>
                <th>deskripsi_permasalahan</th>
                <td><?= $data['transaksi']['deskripsi_permasalahan']; ?></td>
            </tr>
        </table>
    <?php else : ?>
        <p>Data transaksi tidak ditemukan.</p>
    <?php endif; ?>
</body>
</html>

<style>
    body {
    font-family: 'Courier New', Courier, monospace; /* Memberikan font seperti struk */
    background-color: #f5f5f5;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    text-transform: uppercase;
    border-bottom: 1px dashed #000;
    padding-bottom: 10px;
}

table {
    width: 300px;
    margin: 0 auto;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
    text-align: left;
    padding: 8px;
    font-size: 14px;
    border-bottom: 1px dashed #ddd;
}

th {
    width: 120px;
    text-transform: capitalize;
}

td {
    text-align: right;
}

tr:last-child th, tr:last-child td {
    border-bottom: none;
}

p {
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
    font-style: italic;
}
