const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies['token'];
    if (!token){
      console.log('no cookie');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = payload;
    req.user = { id, username };
    next();
  } catch(err) {
    console.error(err);
  }
}

module.exports = authMiddleware