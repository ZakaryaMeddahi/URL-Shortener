// public modules
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// private modules
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const shortcutRouter = require('./routes/shortcuts');
const redirectRouter = require('./routes/redirect');
const authMiddleware = require('./middlewares/authentication');
const errorHandler = require('./middlewares/error-handler');

// Variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// Set View Engine
app.set("view engine", "pug");

// Security Middlewares
app.use(cors(/*{
  credentials: true
}*/));
app.use(helmet());
app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes window
  max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
  legacyHeaders: false // X-RateLimit-* headers
}));

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', redirectRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/urls', authMiddleware, shortcutRouter);

// Error Handler
app.use(errorHandler);

// Start The Server
app.listen(port, async () => {
  try {
    // Connect To DB
    await connectDB(uri);
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
})