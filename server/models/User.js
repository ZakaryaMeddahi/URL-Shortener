const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type : String,
    required:[true, 'Please provide your username'],
    minLength: 3,
    maxLength: 25
  },
  email:{
    type:String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 6,
  }
})

// Middlewares
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Custom Methodes
UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, username: this.username }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME } // Expires in one week
  );
}

UserSchema.methods.matchPassword = async function (password) {
  // Compare method is used to check if the entered pass matches with hashed one
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)