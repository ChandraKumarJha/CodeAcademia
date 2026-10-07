const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'))
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'))
});

app.post('/form/signin', (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)

    console.log(`Received JSON Data -> Username: ${username}, Email: ${email}`);

    res.json({ message: `Success! Welcome aboard, ${username}.` });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});