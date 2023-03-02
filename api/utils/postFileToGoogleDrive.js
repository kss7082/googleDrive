const fs = require("fs");
const { google } = require("googleapis");
const moment = require("moment");

const KEYFILEPATH = "../../key.json";

const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: scopes,
});

const createAndUploadFile = async (auth) => {
  const date = moment().format("YYYY-MM-DD");

  const driveService = google.drive({
    version: "v3",
    auth,
  });
  let fileMetaData = {
    name: `${date}.txt`,
    parents: ["1vpQOZCIDAJzLlDCY9_snMXBRZsiiYdQ3"],
  };

  let media = {
    mimeType: "text/log",
    body: fs.createReadStream(`../../logs/${date}.log`),
  };

  let response = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: "id",
  });

  switch (response.status) {
    case 200:
      console.log("File create id:", response.data.id);
      break;
  }
};

const uploadInterval = () =>
  setInterval(function () {
    createAndUploadFile(auth);
  }, 86400000);

uploadInterval();
