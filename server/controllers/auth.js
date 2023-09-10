const { BadRequestError, UnauthorizedError } = require("../errors");
const User = require("../models/User");


const register = async (req, res, next) => {
  try {
    const { password } = req.body;
    if(password < 6) {
      const err = new BadRequestError('Please provide valide password!');
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
    .json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(email || password < 6) {
      const err = new BadRequestError('Please provide valide email and password!');
      return next(err);
    }
    const user = await User.findOne({ email });
    if(!user) {
      const err = new UnauthorizedError('Invalid Credentials!');
      return next(err);
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      const err = new UnauthorizedError('Incorrect Passeword!');
      return next(err);
    }
    const token = user.createJWT();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.status(200)
    .json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/login');
}

module.exports = {
  register,
  login,
  logout
}