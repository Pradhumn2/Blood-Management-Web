const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController
} = require("../controller/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//add inventory || post
router.post("/create-inventory", authMiddleware, createInventoryController);

//get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

//get donar records
router.get("/get-donars", authMiddleware, getDonarController);

//get hospital records
router.get("/get-hospitals", authMiddleware, getHospitalController);

//get organisation records
router.get("/get-organisation", authMiddleware, getOrganisationController);


module.exports = router;
