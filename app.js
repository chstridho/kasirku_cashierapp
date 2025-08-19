const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const produkRoutes = require('./routes/produkRoutes'); // ✅ IMPORT

const app = express();

// CONFIG
dotenv.config();            
connectDB();                

// PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC & VIEW
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use(authRoutes);
app.use(produkRoutes); // ✅ DAFTARKAN PRODUK

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
