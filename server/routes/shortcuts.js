const { 
  getShortcuts, 
  createShortcut, 
  getShortcut, 
  updateShortcut 
} = require('../controllers/shortcuts');
const router = require('express').Router();

router.route('/').get(getShortcuts).post(createShortcut);
router.route('/:id').get(getShortcut).put(updateShortcut);

module.exports = router