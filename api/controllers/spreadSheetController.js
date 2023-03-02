const spreadSheetService = require("../services/spreadSheetService");

const getSpreadSheetContent = async (req, res) => {
  const { spreadsheetId, range } = req.body;
  await spreadSheetService.getSpreadSheetContent(spreadsheetId, range);
  return res.status(201).json({ message: "SUCCESS_POST_GET_CONTENTS" });
};

const postSpreadSheetContent = async (req, res) => {
  const { spreadsheetId, range, valueInputOption, values } = req.body;
  await spreadSheetService.postSpreadSheetContent(
    spreadsheetId,
    range,
    valueInputOption,
    values
  );
  return res.status(201).json({ message: "SUCCESS_POST_SHEET_CONTENT" });
};

module.exports = { getSpreadSheetContent, postSpreadSheetContent };
