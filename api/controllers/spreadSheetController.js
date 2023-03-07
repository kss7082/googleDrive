const spreadSheetService = require("../services/spreadSheetService");
// 구글시트 불러오기, 구글시트 아이디랑 범위필요함
const getSpreadSheetContent = async (req, res) => {
  const { spreadsheetId, range } = req.body;
  await spreadSheetService.getSpreadSheetContent(spreadsheetId, range);
  return res.status(201).json({ message: "SUCCESS_POST_GET_CONTENTS" });
};
// 구글시트 쓰기, 시트아이디랑 범위, 넣는 옵션, 값 까지 필요함
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
