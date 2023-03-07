require("dotenv").config();
const { MongoClient } = require("mongodb");

const { createApp } = require("./app");
const logger = require("./api/utils/serverLogger");
const app = createApp();
const PORT = process.env.PORT;
const client = new MongoClient("mongodb://localhost:27017/mydb");

const startServer = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥몽고DB연결완료🔥🔥🔥🔥🔥🔥🔥🔥🔥");
    client.close();
  }
};

app.listen(PORT, () => {
  console.log(`🔥🔥🔥🔥🔥🔥서버연결완료🔥🔥포트"${PORT}"🔥🔥🔥🔥🔥🔥`);
  logger.info(`서버연결완료🔥🔥🔥🔥🔥🔥🔥🔥🔥 `);
});

startServer();
