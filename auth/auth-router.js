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
  try {
    const { username, password } = req.body;
    /* const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid username",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = getJWT(user.username);

    res.status(200).json({
      message: `Welcome ${user.username}!`,
      token,
    }); */

    Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compare(password, user.password)) {
        const token = getJWT(user.username)

        res.status(200).json({
          message: `Welcome ${user.username}! Here is a token...`,
          token
        })
      } else {
        res.status(401).json({
          message: "Invalid credentials"
        })
      }
    })
  } catch (err) {
    next(err);
  }
});

function getJWT(username) {
  const payload = {
    userId: username.id,
    username: username.username,
    role: "admin",
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
