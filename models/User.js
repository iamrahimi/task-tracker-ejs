const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
const { string } = require('joi');


const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      role: {
        type: String,
        enum: {
          values: ['admin', 'user'],
          message: '{VALUE} is not supported',
        }, 
        default: 'user',
      }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  // UserSchema.methods.createJWT = function () {
  //   return jwt.sign(
  //     { userId: this._id, name: this.name },
  //     process.env.JWT_SECERET_STRING,
  //     {
  //       expiresIn: process.env.JWT_EXPIRY_DURATION,
  //     }
  //   )
  // }
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }


module.exports = mongoose.model('User', UserSchema)