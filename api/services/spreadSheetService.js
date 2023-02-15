const spreadSheetDao = require("../models/spreadSheetDao");
const credentials = require("../../key.json");
const { google } = require("googleapis");
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes,
});

const sheets = google.sheets({ version: "v4", auth });

const getSpreadSheetContent = async (spreadsheetId, range) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    majorDimension: "columns",
    range,
  });
  const result = response.data.values;
  return spreadSheetDao.getSpreadSheetContentsRow(result);
};

const postSpreadSheetContent = async (
  spreadsheetId,
  range,
  valueInputOption,
  values
) => {
  const resource = { values };
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  });
  return response;
};

module.exports = { getSpreadSheetContent, postSpreadSheetContent };
