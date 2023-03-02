const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/mydb");
const database = client.db("mydb");
const users = database.collection("users");
const verification = database.collection("verifyCode");

const postUserNaverData = async (userData) => {
  return users.insertMany([
    {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    },
  ]);
};

const findUserData = async (email) => {
  return users.findOne({ email: email });
};

const findUserDataById = async (id) => {
  return users.findOne({ id: id });
};

const postUserData = async (id, hashPassword, email, phoneNumber, address) => {
  return users.insertMany([
    {
      id: id,
      password: hashPassword,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
    },
  ]);
};

const sendVerifyCode = async (phoneNumber, verifyCode, name, birthday) => {
  const verificationExpiration = new Date();
  verificationExpiration.setMinutes(verificationExpiration.getMinutes() + 3);

  const verificationData = {
    phoneNumber: phoneNumber,
    verifyCode: verifyCode,
    name: name,
    birthday: birthday,
    expiration: verificationExpiration,
  };

  await verification.insertMany([verificationData]);

  setTimeout(async () => {
    await verification.deleteOne(verificationData);
  }, 3 * 60 * 1000);
};

const checkVerifyCode = async (phoneNumber, code) => {
  return verification.findOne({ phoneNumber: phoneNumber, verfiyCode: code });
};

module.exports = {
  postUserNaverData,
  findUserData,
  postUserData,
  findUserDataById,
  sendVerifyCode,
  checkVerifyCode,
};
