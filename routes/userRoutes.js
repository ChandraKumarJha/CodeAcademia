const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});

router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'))
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'))
});

router.get('/codeVision', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'codevision.html'))
});

module.exports = router;