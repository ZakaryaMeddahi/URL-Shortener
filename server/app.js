// public modules
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// private modules
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const shortcutRouter = require('./routes/shortcuts');
const redirectRouter = require('./routes/redirect');

// Variables
const port = process.env.PORT || 5000;

// Security Middlewares
app.use(cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', redirectRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/urls', shortcutRouter);

// Start The Server
app.listen(port, async () => {
  try {
    // Connect To DB
    await connectDB(process.env.MONGO_URI);
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
})