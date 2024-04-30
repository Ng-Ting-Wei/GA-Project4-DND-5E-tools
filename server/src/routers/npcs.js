const express = require("express");
const {
  getAllNPCs,
  getNPCsById,
  getNPCsByPlayer,
  addNPCs,
  updateNPC,
  deleteNPC,
} = require("../controllers/npcs");
const router = express.Router();

router.get("/npcs", getAllNPCs);
router.post("/npcs/id", getNPCsById);
router.post("/npcs/player", getNPCsByPlayer);
router.put("/npcs", addNPCs);
router.patch("/npcs", updateNPC);
router.delete("/npcs", deleteNPC);

module.exports = router;
