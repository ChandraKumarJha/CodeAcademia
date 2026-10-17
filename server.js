const express = require('express');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const codeVisionRoutes = require('./routes/codeVisionRoutes');
const path = require("path");
const fs = require('fs');
const port = process.env.PORT || 3000;
const PISTON_API_URL = (process.env.PISTON_API_URL || "http://localhost:2000/api/v2").replace(/\/+$/, "");

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({
  // Monaco's workers and CDN scripts need a permissive policy for this starter.
  // Tighten CSP and self-host Monaco before a high-security production deployment.
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(require("./routes/codeVisionRoutes"));
app.use(express.json({ limit: "64kb" }));

const executeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many execution requests. Please wait a minute and try again." }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/courses', coursesRoutes);
app.use('/api', codeVisionRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});