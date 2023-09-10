const { 
  getShortcuts, 
  createShortcut, 
  getShortcut, 
  updateShortcut, 
  deleteShortcut 
} = require('../controllers/shortcuts');
const router = require('express').Router();

router.route('/').get(getShortcuts).post(createShortcut);
router.route('/:id').get(getShortcut).put(updateShortcut).delete(deleteShortcut);

module.exports = router