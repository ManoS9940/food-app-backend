const Food = require("../model/food");

exports.addfood = async (req,res,next)=>{
    const {item_name,price,imageUrl} = req.body;
    try {
       await Food.create ({
        item_name:item_name,
        price: price,
        imageUrl:imageUrl,
    }).then(food=>{
        res.status(201).json({
            food:food,
        })
    })
    } catch (error) {
      res.status(400).json({
        message:"Error Occurred",
        error:error.message
      })  
    }
}

exports.getFoods = async (req,res,next)=>{
  await Food.find ({}).then(foods=>{
    const getfood = foods.map(food=>{
      const foodcontainer = {}
      foodcontainer.item_name=food.item_name
      foodcontainer.price=food.price
      foodcontainer.imageUrl=food.imageUrl
      return foodcontainer
    })
    res.status(200).json({getfood})
  }).catch((err) => {
    res.status(400).json({message: "Not successful", error: err.message })
  })
}

exports.deleteFood = async (req, res, next) => {
  const { id } = req.body
  await Food.findById(id)
    .then(food => food.remove())
    .then(food =>
      res.status(201).json({ message: "Food Item successfully deleted", food })
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    )
}