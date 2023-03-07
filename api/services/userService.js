const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const verification = require("../utils/verification");
const { throwCustomError } = require("../utils/error");

const userSignUp = async (id, password, name, phoneNumber) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return userDao.postUserData(id, hashPassword, name, phoneNumber);
};

const userSignIn = async (id, password) => {
  const user = await userDao.findUserDataById(id);
  if (!user) {
    throwCustomError("일치하는 정보가 없습니다", 409);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throwCustomError("비밀번호가 다릅니다.", 409);
  }
  const accessToken = jwt.sign(
    { id: user.idNum },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    { id: user.idNum },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "14d" }
  );
  const time = moment().add(1, "hour");
  const expireTime = time.format("YYYY.MM.DD HH:mm:ss");

  await userDao.postToken(refreshToken, user.idNum, accessToken);

  const tokens = [
    { accessToken: accessToken, expirationTime: expireTime },
    { refreshToken: refreshToken },
  ];

  return tokens;
};

const verifyCode = async (phoneNumber, code, userName) => {
  if (!code) throwCustomError("인증번호를 입력해주세요", 409);
  const verificationCode = await verification.verificationCode(
    phoneNumber,
    code,
    userName
  );

  if (!verificationCode) throwCustomError("인증번호가 틀립니다", 409);
  const findUserId = await userDao.findUserIdbyPhoneNumber(
    phoneNumber,
    userName
  );

  if (!findUserId) throwCustomError("일치하는 정보가 없습니다.", 409);

  return findUserId;
};

const patchPassword = async (password, id) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return await userDao.patchPassword(hashPassword, id);
};

const checkDuplicateId = async (id) => {
  if (!id) throwCustomError("아이디를 입력해주세요", 409);
  const result = await userDao.findUserDataById(id);
  if (!result) {
    return "사용가능한 아이디입니다.";
  } else {
    throwCustomError("중복되거나 탈퇴한 아이디입니다.", 409);
  }
};

const reissuanceToken = async (refreshToken, accessToken) => {
  const verificationToken = await userDao.reissuanceToken(
    refreshToken,
    accessToken
  );

  if (!verificationToken) throwCustomError("다시 로그인해주시길 바랍니다", 401);

  const newAccessToken = jwt.sign(
    { id: verificationToken.id },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const newRefreshToken = jwt.sign(
    { id: verificationToken.id },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "14d",
    }
  );

  await userDao.updateTokens(
    newAccessToken,
    newRefreshToken,
    refreshToken,
    accessToken
  );

  const time = moment().add(1, "hour");
  const expireTime = time.format("YYYY.MM.DD HH:mm:ss");

  const token = [
    { accessToken: newAccessToken, expirationTime: expireTime },
    { refreshToken: newRefreshToken },
  ];

  return token;
};

module.exports = {
  userSignUp,
  userSignIn,
  verifyCode,
  patchPassword,
  checkDuplicateId,
  reissuanceToken,
};
