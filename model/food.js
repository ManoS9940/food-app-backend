const Mongoose = require("mongoose")


const FoodSchema = new Mongoose.Schema({
    item_name:{type:String},
    price:{type:Number},
    imageUrl:{type:String,default:null}
  })
  
  
  const Food = Mongoose.model("food", FoodSchema)

  module.exports = Food