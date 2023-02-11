 const jwtSecret = process.env.jwtSecret
 const express = require('express');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 
 // Import the model for the User schema
 const User = require('../model/user');
 
 // Route for handling user registration
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword
    });
    await user.save();
    res.status(200).send({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).send({ message: 'Registration failed' });
  }
};

 

 
 exports.login = async (req, res) => {
   const { username, password } = req.body;
 
   // find the user in the database
   const user = await User.findOne({ username });
   if (!user) return res.status(400).json({ message: 'User not found' });
 
   // compare the passwords
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });
 
   // create and sign the JWT
   const payload = { id: user._id, username: user.username };
   const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
 
   return res.status(200).json({ token });
 };
 
 


exports.update = async (req, res, next) => {
    const { role, id } = req.body;
    // First - Verifying if role and id is presnt
    if (role && id) {
      // Second - Verifying if the value of role is admin
      if (role === "admin") {
        // Finds the user with the id
        await User.findById(id)
          .then((user) => {
            // Third - Verifies the user is not an admin
            if (user.role !== "admin") {
              user.role = role;
              user.save((err) => {
                //Monogodb error checker
                if (err) {
                  res
                    .status(400)
                    .json({ message: "An error occurred", error: err.message });
                  process.exit(1);
                }
                res.status(201).json({ message: "Update successful", user });
              });
            } else {
              res.status(400).json({ message: "User is already an Admin" });
            }
          })
          .catch((error) => {
            res
              .status(400)
              .json({ message: "An error occurred", error: error.message });
          })
        }
    }
}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
      .then(user => user.remove())
      .then(user =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch(error =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      )
  }
  
  exports.getUsers = async (req, res, next) => {
    await User.find({})
      .then(users => {
        const userFunction = users.map(user => {
          const container = {}
          container.username = user.username
          container.role = user.role
          return container
        })
        res.status(200).json({ user: userFunction })
      })
      .catch(err =>
        res.status(401).json({ message: "Not successful", error: err.message })
      )
  }

