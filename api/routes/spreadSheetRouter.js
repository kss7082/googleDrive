const express = require("express");

const router = express.Router();

const spreadSheetController = require("../controllers/spreadSheetController");

router.post("", spreadSheetController.getSpreadSheetContent);
router.post("/data", spreadSheetController.postSpreadSheetContent);

module.exports = { router };
