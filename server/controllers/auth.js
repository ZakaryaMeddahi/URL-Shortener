const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError } = require("../errors");
const User = require("../models/User");

const clientUrl = process.env.CLIENT_DOMAIN;

const register = async (req, res, next) => {
  try {
    const { password } = req.body;
    if(password < 6) {
      const err = new BadRequestError('Please provide valid password!');
      return next(err);
    }
    const user = User({ ...req.body });
    await user.save();
    const token = user.createJWT();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.status(201)
    .json({ success: true, user: { id: user._id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if(!email || password.length < 6) {
      const err = new BadRequestError('Please provide valid email and password!');
      return next(err);
    }
    const user = await User.findOne({ email });
    if(!user) {
      const err = new UnauthorizedError('Invalid Credentials!');
      return next(err);
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      const err = new UnauthorizedError('Incorrect Password!');
      return next(err);
    }
    const token = user.createJWT();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // sameSite: 'lax',
      // secure: true
    });
    // res.header('Access-Control-Allow-Origin', 'true');
    res.status(200)
    .json({ success: true, user: { id: user._id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const validateToken = (req, res) => {
  try {
    console.log('validateToken');
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new UnauthorizedError('Invalid token');
      return next(err);
    }
    token = authHeader.split(' ')[1];
    console.log('validate token', token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, user: payload });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const logout = (req, res) => {
  // res.cookie('token', '', { maxAge: 1 });
  res.redirect(`${clientUrl}login.html`);
}

module.exports = {
  register,
  login,
  validateToken,
  logout
}