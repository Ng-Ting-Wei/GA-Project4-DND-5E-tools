const express = require("express");
const router = express.Router();
const { getAllRoles } = require("../controllers/roles");
const { auth } = require("../middleware/users");

router.get("/roles", auth, getAllRoles);

module.exports = router;
