const Shortcut = require("../models/Shortcut");


const redirect = async (req, res) => {
  try {
    const { pathname } = req.params;
    const shortcut = await Shortcut.findOne({ pathname });
    if(!shortcut) {
      const url = `https://localhost:3000/${pathname} is not valide`;
      return res.render('not-found', { url });
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