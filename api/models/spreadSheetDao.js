const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/mydb");
const database = client.db("mydb");
const test2 = database.collection("schoolTestInfomation");

const getSpreadSheetContentsRow = async (result) => {
  let schools = [];
  for (let i = 0; i < result[1].length - 1; i++) {
    const titleNum = result[1][i + 1].split(",")[0].split("-")[1] > 6 ? 3 : 1;
    const grades = {
      1: {
        title: titleNum,
        date: result[1][i + 1].split(","),
        addData: result[2][i + 1],
        etc: result[3][i + 1],
      },
      2: {
        title: titleNum,
        date: result[4][i + 1].split(","),
        addData: result[5][i + 1],
        etc: result[6][i + 1],
      },
      3: {
        title: titleNum,
        date: result[7][i + 1].split(","),
        addData: result[8][i + 1],
        etc: result[9][i + 1],
      },
    };
    const school = {
      id:
        result[0][i + 1] +
        "-" +
        grades[1].date[0].split("-")[0] +
        "-" +
        titleNum,
      isActive: true,
      provider: "server",
      update: new Date(),
      name: result[0][i + 1],
      grade: grades,
    };

    schools.push(school);
  }

  try {
    await test2.insertMany(schools);
    console.log("Successfully saved to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getSpreadSheetContentsRow };
