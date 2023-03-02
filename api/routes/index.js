const express = require("express");
const router = express.Router();

const spreadSheetRouter = require("./spreadSheetRouter");
const uploadFileRouter = require("./uploadFileRouter");
const userRouter = require("./userRouter");

router.use("/spread", spreadSheetRouter.router);
router.use("/files", uploadFileRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
