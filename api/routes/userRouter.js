const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const naverController = require("../controllers/naverController");
const userController = require("../controllers/userController");

router.post("/naver/login", naverController.naverLogin);
router.post("/signup", userController.userSignUp);
router.post("/signin", userController.userSignIn);
router.post("/message", naverController.sendVerifyCode);
router.get("/verifycode", userController.verifyCode);
router.patch("/password", userController.patchPassword);
router.get("/duplicate-id", userController.checkDuplicateId);
router.post("/token", userController.reissuanceToken);

module.exports = { router };
