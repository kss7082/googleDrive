const express = require("express");
const { upload } = require("../utils/upload");
const router = express.Router();

const uploadFileController = require("../controllers/uploadFileController");

router.post("/progress", upload, uploadFileController.uploadFileGoogle);
router.post("/dragndrop", upload, uploadFileController.uploadFileGoogle);

module.exports = { router };
