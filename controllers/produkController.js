const Produk = require('../models/produk');

// Tampilkan semua produk
exports.index = async (req, res) => {
  try {
    const products = await Produk.find().lean();
    res.render('admin/produk', { produkList: products });
  } catch (error) {
    console.error('ERROR INDEX:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data produk');
  }
};

// Tampilkan form tambah produk
exports.create = (req, res) => {
  res.render('admin/tambah_produk');
};

// Simpan produk baru
exports.store = async (req, res) => {
  const { nama, harga, stok } = req.body;
  console.log('Received data:', { nama, harga, stok }); // Debugging

  // Validasi input
  if (!nama || !harga || !stok) {
    return res.status(400).send('Semua field harus diisi');
  }

  try {
    // Konversi harga dan stok menjadi Number
    const parsedHarga = parseInt(harga, 10);
    const parsedStok = parseInt(stok, 10);

    // Simpan produk ke database
    await Produk.create({ nama, harga: parsedHarga, stok: parsedStok });
    res.redirect('/produk');
  } catch (error) {
    console.error('ERROR STORE:', error);
    res.status(500).send('Gagal menambahkan produk');
  }
};

// Hapus produk
exports.delete = async (req, res) => {
  try {
    await Produk.findByIdAndDelete(req.params.id);
    res.redirect('/produk');
  } catch (error) {
    console.error('ERROR DELETE:', error);
    res.status(500).send('Gagal menghapus produk');
  }
};