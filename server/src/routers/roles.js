const express = require("express");
const router = express.Router();
const { getAllRoles } = require("../controllers/roles");

router.get("/roles", getAllRoles);

module.exports = router;
