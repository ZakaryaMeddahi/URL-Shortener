const { login, register, logout, validateToken } = require('../controllers/auth');
const router = require('express').Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/validateToken').post(validateToken);
router.route('/logout').get(logout);

module.exports = router