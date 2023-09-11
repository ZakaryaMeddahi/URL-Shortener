const Shortcut = require("../models/Shortcut");

const clientDomain = process.env.CLIENT_DOMAIN;
const serverDomain = process.env.SERVER_DOMAIN;

const redirect = async (req, res) => {
  try {
    const { pathname } = req.params;
    const shortcut = await Shortcut.findOne({ pathname });
    if(!shortcut) {
      const url = `${serverDomain}${pathname} is not valide`;
      return res.render('not-found', { url, clientDomain });
    }
    const { url } = shortcut;
    res.redirect(url);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  redirect
}