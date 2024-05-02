const UsersModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUser = async (req, res) => {
  try {
    const users = await UsersModel.find();

    const outputArray = [];
    for (const user of users) {
      outputArray.push({
        email: user.email,
        username: user.username,
        role: user.role,
        characters: user.characters,
        npcs: user.npcs,
      });
    }
    res.json(outputArray);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const getUserId = await UsersModel.findById(req.body.id);
    res.json(getUserId);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting" });
  }
};

const register = async (req, res) => {
  try {
    const auth = await UsersModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const password = await bcrypt.hash(req.body.password, 12);
    await UsersModel.create({
      email: req.body.email,
      username: req.body.username,
      password: password,
      role: req.body.role || "Player",
      characters: [],
      npcs: [],
    });

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await UsersModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, auth.password);
    if (!result) {
      console.error("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      eamil: auth.email,
      role: auth.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ status: "ok", msg: "logged in", data: auth, access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token failed" });
  }
};

module.exports = { getAllUser, getUserById, register, login, refresh };
