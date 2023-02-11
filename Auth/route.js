const express = require("express")
const router = express.Router()
const { register,login,update,deleteUser,getUsers } = require("./auth")
const{addfood, getFoods, deleteFood} = require("./menu")
const { adminAuth } = require("../middleware/middleware")
const { payment } = require("./payment")
router.route("/register").post(register)
router.route("/getUsers").get(getUsers)
router.route("/addfood").post(addfood, adminAuth)
router.route("/getFoods").get(getFoods, adminAuth)
router.route("/deleteFood").delete(deleteFood, adminAuth)
router.route("/login").post(login)
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)
router.route("/checkout/api/paypal/payment/create/").post(payment)




module.exports = router