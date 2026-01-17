const express = require("express");
const router = express.Router();
const {
  createPredefinedMiscItem,
  getAllPredefinedMiscItems,
  updatePredefinedMiscItem,
  deletePredefinedMiscItem,
} = require("../controllers/predefinedMiscItemController");

router.post("/", createPredefinedMiscItem);
router.get("/", getAllPredefinedMiscItems);
router.put("/:id", updatePredefinedMiscItem);
router.delete("/:id", deletePredefinedMiscItem);

module.exports = router;