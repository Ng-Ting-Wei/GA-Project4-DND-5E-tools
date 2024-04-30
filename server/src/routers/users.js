const express = require("express");
const router = express.Router();

const {
  getAllUser,
  register,
  login,
  refresh,
} = require("../controllers/users");
const { auth } = require("../middleware/users");

router.get("/users/alluser", auth, getAllUser);
router.put("/users/register", register);
router.post("/users/login", login);
router.post("/users/refresh", auth, refresh);

module.exports = router;
