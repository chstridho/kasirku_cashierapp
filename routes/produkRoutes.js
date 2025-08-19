const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// Rute untuk menampilkan semua produk
router.get('/produk', produkController.index);

// Rute untuk menampilkan form tambah produk
router.get('/produk/tambah', produkController.create);

// Rute untuk menyimpan produk baru
router.post('/produk', produkController.store);

// Rute untuk menghapus produk
router.get('/produk/hapus/:id', produkController.delete);

module.exports = router;