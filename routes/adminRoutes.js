const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteUserController,
} = require("../controller/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//ROUTES
const router = express.Router();

//get donar list
router.get("/donar-list", authMiddleware, getDonarListController);

//get hospital list
router.get("/hospital-list", authMiddleware, getHospitalListController);

//get organisation list
router.get("/org-list", authMiddleware, getOrgListController);

//delete user
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

//EXPORTS
module.exports = router;
