const crypto = require('crypto');
const Shortcut = require('../models/Shortcut');

const generatePathname = async () => {
  let shortcut, pathname;
  do {
    pathname = crypto.randomBytes(3).toString('hex');
    shortcut = await Shortcut.findOne({ pathname });
  } while (shortcut);
  console.log(pathname);
  return pathname;
}

module.exports = generatePathname