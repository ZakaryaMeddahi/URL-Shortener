const { redirect } = require('../controllers/redirect');
const router = require('express').Router();

router.route('/:pathname').get(redirect);

module.exports = router