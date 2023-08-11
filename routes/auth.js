const express = require("express");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const router = express.Router();

//Post Method
router.post("/register", async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    console.log("Register");
    if (oldUser) {
      return res.status(409).json({
        code: 409,
        message: "User Already Exist. Please Login",
      });
    } else {
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
        phone: req.body.phone,
        address: req.body.address,
      });
      const userToSave = newUser.save();
      res.status(200).json({
        code: 200,
        message: "User registered successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ code: 200, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        code: 400,
        message: "All input is required",
      });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        code: 200,
        message: "Logged in successfully",
        data: user,
      });
      res.status(400).json({
        code: 400,
        message: "Invalid Credentials",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
