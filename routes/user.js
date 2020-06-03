const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /user/history
// @desc   Get User
// @access private

router.get("/history", verifyToken, authController.getMe);

module.exports = router;