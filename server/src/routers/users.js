const express = require("express");
const {
  getAllUser,
  register,
  login,
  refresh,
} = require("../controllers/users");
const router = express.Router();

router.get("/users/alluser", getAllUser);
router.put("/users/register", register);
router.post("/users/login", login);
router.post("/users/refresh", refresh);

module.exports = router;
