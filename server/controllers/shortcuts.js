const { NotFoundError, BadRequestError } = require("../errors");
const Shortcut = require("../models/Shortcut");
const checkUrl = require("../services/checkUrl");
const generatePathname = require("../services/generatePathname");


const getShortcuts = async (req, res) => {
  try {
    const shortcuts = await Shortcut.find();
    if(!shortcuts) {
      const err = new NotFoundError('Error when trying to get shortcuts!');
      return next(err);
    }
    // res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({ success: true, shortcuts });
  } catch (err) {
    console.error(err);
  }
}

const createShortcut = async (req, res, next) => {
  try {
    const { user: { id: userId }, body: { url, pathname } } = req;
    const errMessage = await checkUrl(url);
    if(errMessage) {
      const err = new BadRequestError(errMessage);
      return next(err);
    }
    const shortcut = Shortcut({
      url,
      pathname: pathname || await generatePathname(),
      createdBy: userId
    });
    await shortcut.save();
    res.status(201).json({ success: true, shortcut });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const getShortcut = async (req, res) => {
  try {
    const { user: { id: userId }, params: { id: shortcutId } } = req;
    const shortcut = await Shortcut.findOne({ _id: shortcutId, createdBy: userId });
    res.status(200).json({ success: true, shortcut });
  } catch (err) {
    console.error(err);
  }
}

const updateShortcut = async (req, res, next) => {
  try {
    const { 
      user: { id: userId }, 
      params: { id: shortcutId }, 
      body: modifiedShortcut 
    } = req;
    const errMessage = await checkUrl(modifiedShortcut.url);
    if(errMessage) {
      const err = new BadRequestError(errMessage);
      return next(err);
    }
    const updatedShortcut = await Shortcut.findOneAndUpdate({ 
      _id: shortcutId, 
      createdBy: userId
    }, modifiedShortcut, { new: true, runValidators: true });
    res.status(200).json({ success: true, updatedShortcut });
  } catch (err) {
    console.error(err);
  }
}

const deleteShortcut = async (req, res, next) => {
  try {
    const { user: { id: userId }, params: { id: shortcutId } } = req;
    const shortcut = await Shortcut.findOne({ 
      _id: shortcutId, 
      createdBy: userId 
    });
    if(!shortcut) {
      const err = new NotFoundError(`There is no Shortcut with ID ${shortcutId}`);
      return next(err);
    }
    await shortcut.deleteOne();
    // res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({ 
      success: true, 
      message: `Shortcut with ID ${shortcutId} has been deleted successfully` 
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  getShortcuts,
  createShortcut,
  getShortcut,
  updateShortcut,
  deleteShortcut
}