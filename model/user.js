const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  },
  role: {
    type: String,
    default: "User"
    
  },
});

const User = Mongoose.model("user", UserSchema)
module.exports = User