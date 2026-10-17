const express = require("express");
const router = express.Router();
const path = require("path");

let category = "All";

router.get('/', (req, res) => {
    category = "All";
    res.sendFile(path.join(__dirname, '..', 'public', 'courses.html'));
});

router.get('/web-development', (req, res) => {
    category = "Web Development";
    res.sendFile(path.join(__dirname, '..', 'public', 'courses.html'));
});

router.get('/git-github', (req, res) => {
    category = "Git Github";
    res.sendFile(path.join(__dirname, '..', 'public', 'courses.html'));
});

router.get('/python', (req, res) => {
    category = "Python";
    res.sendFile(path.join(__dirname, '..', 'public', 'courses.html'));
});

router.get('/cpp', (req, res) => {
    category = "C++";
    res.sendFile(path.join(__dirname, '..', 'public', 'courses.html'));
});

router.get('/category', (req, res) => {
    res.send(category);
});

router.get('/web-dev/html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'courses', 'html.html'))
})

module.exports = router;