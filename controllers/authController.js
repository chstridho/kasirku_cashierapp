const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fungsi untuk menghasilkan token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register
exports.register = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log request body
    const { name, email, password } = req.body; // Sesuaikan nama field

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Pengguna berhasil didaftarkan' });
  } catch (error) {
    console.error(error); // Menampilkan pesan error di console
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Kredensial tidak valid' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Kredensial tidak valid' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error(error); // Menampilkan pesan error di console
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};