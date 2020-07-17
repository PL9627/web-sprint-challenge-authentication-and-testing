const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth-model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
});

module.exports = router;
