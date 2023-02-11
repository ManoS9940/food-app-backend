const Mongoose = require("mongoose")

const localDB = `mongodb+srv://Mano9940:Dan09940@cluster0.eurlw.mongodb.net/food-app`
const connectDB = async () => {
  await Mongoose.set('strictQuery', true)
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB
