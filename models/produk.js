const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
});

module.exports = mongoose.model('Produk', produkSchema);