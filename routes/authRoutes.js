const express = require("express");
const { register, login, getUser } = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user", authMiddleware, getUser);

module.exports = router;
