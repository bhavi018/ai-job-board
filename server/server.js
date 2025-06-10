// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Config
dotenv.config();

//Express app
const app = express();
app.use(cors());
app.use(express.json());


// MongoDB Connection
const connectDB = require('./config/db');
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const resumeRoutes = require('./routes/resumeRoutes');
app.use('/api/resume', resumeRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const recommendationRoutes = require('./routes/recommendationRoutes');
app.use('/api/recommendation', recommendationRoutes);

app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


// Sample route
app.get('/', (req, res) => res.send('API is running...'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
