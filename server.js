require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();

const authRoutes = require('./backend/routes/auth');
const logRoutes = require('./backend/routes/logs');
const dashboardRoutes = require('./backend/routes/dashboard');
const taskRoutes = require('./backend/routes/tasks');
const userRoutes = require('./backend/routes/users');

// CORS: allow localhost in dev, and Vercel domain in production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL  // e.g. https://your-app.vercel.app
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());

// Mount Routes
app.use('/api', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("BMS Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});