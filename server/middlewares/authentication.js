const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const authMiddleware = (req, res, next) => {
  try {
    console.log('authMiddleware');
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new UnauthorizedError('Invalid token');
      return next(err);
      // return res.redirect('/login');
    }
    token = authHeader.split(' ')[1];
    // const token = req.cookies['token'];
    // if (!token){
    //   console.log('no cookie');
    // }
    console.log('validate token', token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = payload;
    req.user = { id, username };
    next();
  } catch(err) {
    console.error(err);
  }
}

module.exports = authMiddleware