const express = require("express");
const router = express.Router();
const db = require("../config/db");
const sequelize = require("sequelize");
const Users = require("../models/Users");

//to create users
router.post("/createuser", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: `please include a username and password` });
  }
  let usernameExist = await Users.findOne({
    where: { username },
  });

  if (usernameExist) {
    return res
      .status(400)
      .send({ message: `a user with the username ${username} already exist` });
  }

  try {
    let user = await Users.create({
      username,
      password,
    });
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
});

// to find a particular user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res
      .status(400)
      .send({ message: `No User was found with the id ${id}` });
  }
  return res.send(user);
});

//to get all users
router.get("/", async (req, res) => {
  try {
    const user = await Users.findAll();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error, { message: `No User was found` });
  }
});

//update users
router.post("/updateuser/:id", async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  let user = await Users.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(400).send({ message: `No user with the id ${id}` });
  }

  try {
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    user.save();
    return res.send({ message: `User with id ${id} has been updated` });
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
});

//delete users
router.post("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ message: `Please provide a user` });
  }

  let user = await Users.findOne({
    where: { id },
  });
  if (!user) {
    return res.status(400).send({ message: `No user with the id ${id}` });
  }
  try {
    await Users.destroy({
        where: {id},
        //truncate: true
    });
    return res.send({ message: `user with the id ${id} has been deleted` });
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
});

module.exports = router;
