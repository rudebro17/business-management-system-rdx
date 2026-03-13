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

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("Firebase backend running 🚀");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/test", async (req, res) => {
    await db.collection("test").add({
        message: "Firebase is connected"
    });

    res.send("Data added to Firestore");
});