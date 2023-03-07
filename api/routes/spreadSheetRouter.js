const express = require("express");

const router = express.Router();

const spreadSheetController = require("../controllers/spreadSheetController");

router.post("", spreadSheetController.getSpreadSheetContent); // 구글시트 불러오기
router.post("/data", spreadSheetController.postSpreadSheetContent); // 구글시트 쓰기

module.exports = { router };
