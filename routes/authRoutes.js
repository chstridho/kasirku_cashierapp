const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => {
  res.render('auth/register', {
    imagePath: '/images/kasirkita.jpg' 
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    imagePath: '/images/kasirkita.jpg' 
  });
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
