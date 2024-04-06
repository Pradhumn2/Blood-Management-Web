const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controller/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//add inventory || post
router.post("/create-inventory", authMiddleware, createInventoryController);

//get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

// //get recent blood records
// router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

//get hospital blood records
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController)

//get donar records
router.get("/get-donars", authMiddleware, getDonarController);

//get hospital records
router.get("/get-hospitals", authMiddleware, getHospitalController);

//get organisation records for donar
router.get("/get-organisation", authMiddleware, getOrganisationController);

//get organisation records for hospital
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
