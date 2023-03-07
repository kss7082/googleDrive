const { google } = require("googleapis");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const credentials = require("../../key.json");
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = "18gpkv5eN6IzdbGzpFEORXLPybQ-9s2R7AXH75EeR894";
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes,
});
const sheets = google.sheets({ version: "v4", auth });

const getSpreadsheetSingleRange = async (spreadsheetId) => {
  const range = "1학기 중간고사";
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    majorDimension: "columns",
    range,
  });
  const numRows = response.data.values ? response.data.values.length : 0;
  const result = response.data.values;
  console.log(`${numRows} rows retrieved`);
  console.log(result);
  return result;
};