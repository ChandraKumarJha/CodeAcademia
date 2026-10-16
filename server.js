const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const path = require("path");
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/courses', coursesRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});