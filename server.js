const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const path = require("path");
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initailizing local user variables
let userName = null;

app.use('/', userRoutes);
app.use('/', loginRoutes);

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'courses.html'))
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});