const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        default: Date.now,
    },
    totalBiaya: {
        type: Number,
        required: true,
    },
    pelanggan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pelanggan',
        required: true,
    },
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
