const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile('./public/about.html', {root:__dirname});
});

app.get('/html/docs.html', (req, res) => {
  res.sendFile('./public/html/docs.html', {root:__dirname});
});

app.get('/html/user.html', (req, res) => {
  res.sendFile('./public/html/user.html', {root:__dirname});
});

app.get('/html/login.html', (req, res) => {
  res.sendFile('./public/html/login.html', {root:__dirname});
});

const User = require('./models/userModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/html/courses.html', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({
            username,
            email,
            password
        });
        await user.save();
    } catch (err) {
        console.log(err)
        res.send("Error createing user");
    }
});

// 2. Dynamic Search Route
app.get('/search', (req, res) => {
    const searchTerm = req.query.q.toLowerCase().replace(/\s+/g, ''); 
    
    const filePath = path.join(__dirname, 'public', 'HTML', 'courses',  `${searchTerm}.html`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send(`
          <link rel="stylesheet" href="/css/output.css" />

          <body class="h-screen w-screen bg-white text-black dark:bg-gray-900 dark:text-white 
          transition-colors duration-300">
          <h1 class="text-center mt-8 text-4xl font-serif">There are currently NO courses for "${req.query.q}"</h1>
          <h2 class="text-center mb-14 text-4xl font-serif">You can try these available courses :-</h2>
          <div class="flex justify-center items-center flex-col mt-12">
            <a href="/html/html.html" class="w-28 h-10 font-medium text-lg opacity-80 ml-4 text-center 
            cursor-pointer hover:bg-gray-200 hover:text-blue-500 hover:opacity-100 hover:rounded 
            flex justify-center items-center text-black dark:text-white dark:hover:bg-gray-700 
            dark:hover:text-blue-400">HTML</a>

            <a href="/html/css.html" class="w-28 h-10 font-medium text-lg opacity-80 ml-4 text-center 
            cursor-pointer hover:bg-gray-200 hover:text-blue-500 hover:opacity-100 hover:rounded 
            flex justify-center items-center text-black dark:text-white dark:hover:bg-gray-700 
            dark:hover:text-blue-400">CSS</a>

            <a href="/html/javascript.html" class="w-28 h-10 font-medium text-lg opacity-80 ml-4 text-center 
            cursor-pointer hover:bg-gray-200 hover:text-blue-500 hover:opacity-100 hover:rounded 
            flex justify-center items-center text-black dark:text-white dark:hover:bg-gray-700 
            dark:hover:text-blue-400">JavaScript</a>

            <a href="/html/python.html" class="w-28 h-10 font-medium text-lg opacity-80 ml-4 text-center 
            cursor-pointer hover:bg-gray-200 hover:text-blue-500 hover:opacity-100 hover:rounded 
            flex justify-center items-center text-black dark:text-white dark:hover:bg-gray-700 
            dark:hover:text-blue-400">Python</a>

            <a href="/html/expressjs.html" class="w-28 h-10 font-medium text-lg opacity-80 ml-4 text-center 
            cursor-pointer hover:bg-gray-200 hover:text-blue-500 hover:opacity-100 hover:rounded 
            flex justify-center items-center text-black dark:text-white dark:hover:bg-gray-700 
            dark:hover:text-blue-400">Express.Js</a>
          </div>
          </body>
        <script>
          if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark");
          }
        </script>`)
    }
});


app.listen(PORT);