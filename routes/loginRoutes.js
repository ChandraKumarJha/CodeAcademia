const express = require("express");
const router = express.Router();
const path = require("path");
const connectDB = require('../config/db');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

connectDB();
dotenv.config();

router.use(express.static(path.join(__dirname, 'public')));

let userName = null;
let userLogoBg = null;
const User = require('../models/userModel');

function getRandomColor() {
    const colors = [
        "#7B1FA2", "#AA47BD", "#455A65", "#77919D",
        "#5D4138", "#8C6E63", "#0388D2", "#0098A7",
        "#68A039", "#EC417A", "#F6511E", "#EF6C00"
    ]
    const randomColor = colors[Math.round(Math.random() * 11)];
    return randomColor;
}

router.post('/form/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const randomBgColor = getRandomColor();

        const user = await User.create({
            name: username,
            email,
            password: hashedPassword,
            userLogoBG: randomBgColor
        });

        await user.save();
        userName = username;
    } catch (error) {
        console.log(error)
        res.send("Error creating user");
    }
});

router.post('/form/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        console.log("logged in");
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        userName = user.name;
        userLogoBg = user.userLogoBG;
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get('/me', (req, res) => {
    res.json({
        username: userName || "Unknown",
        userLogoBG: userLogoBg || "#512DA7"
    });
});

module.exports = router;