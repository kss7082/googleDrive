const { MongoClient, LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/mydb");
const database = client.db("mydb");
const users = database.collection("users");
const verification = database.collection("verification");
const tokens = database.collection("tokens");

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

const findUserIdbyPhoneNumber = async (phoneNumber, userName) => {
  const user = await users.findOne({
    phoneNumber: phoneNumber,
    name: userName,
  });
  if (user) {
    return user.id;
  } else {
    return null;
  }
};
const postUserData = async (id, hashPassword, name, phoneNumber) => {
  return users.insertMany([
    {
      id: id,
      password: hashPassword,
      phoneNumber: phoneNumber,
      name: name,
    },
  ]);
};

const sendVerifyCode = async (phoneNumber, verifyCode, name) => {
  const verificationExpiration = new Date();
  verificationExpiration.setMinutes(verificationExpiration.getMinutes() + 3);

  const verificationData = {
    phoneNumber: phoneNumber,
    verifyCode: verifyCode,
    name: name,
    expiration: verificationExpiration,
  };

  const result = await verification.insertMany([verificationData]);

  setTimeout(async () => {
    await verification.deleteOne(verificationData);
  }, 3 * 60 * 1000);

  return result;
};

const patchPassword = async (hashPassword, id) => {
  return users.update(
    { id: id },
    { $set: { password: hashPassword } },
    false,
    true
  );
};

const postToken = async (refreshToken, userId) => {
  return tokens.insertMany([
    {
      id: userId,
      refreshToken: refreshToken,
    },
  ]);
};

module.exports = {
  postUserNaverData,
  findUserData,
  findUserDataById,
  postUserData,
  sendVerifyCode,
  findUserIdbyPhoneNumber,
  patchPassword,
  postToken,
};
