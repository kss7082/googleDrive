const fs = require("fs");
const { google } = require("googleapis");

const KEYFILEPATH = "./key.json";

const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: scopes,
});

async function createAndUploadFile(auth) {
  const driveService = google.drive({
    version: "v3",
    auth,
  });

  let fileMetaData = {
    name: "king3.png",
    parents: ["1vpQOZCIDAJzLlDCY9_snMXBRZsiiYdQ3"],
  };

  let media = {
    mimeType: "image/png",
    body: fs.createReadStream("./king.png"),
  };

  let response = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: "id",
  });

  switch (response.status) {
    case 200:
      console.log("File create id", response.data.id);
      break;
  }
}

createAndUploadFile(auth);
