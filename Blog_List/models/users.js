const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
  })
  
  UserSchema.plugin(uniqueValidator)
  

UserSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id= returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User