const userDao = require("../models/userDao");
const { emailValidation, pwValidation } = require("../utils/validation-check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (id, password, email, phoneNumber, address) => {
  await pwValidation(password);
  await emailValidation(email);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return userDao.postUserData(id, hashPassword, email, phoneNumber, address);
};

const userSignIn = async (id, password) => {
  const user = await userDao.findUserDataById(id);
  if (!user) {
    const err = new Error("일치하는 정보가 없습니다.");
    err.statusCode = 409;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("USER_IS_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

const duplicateEmailCheck = async (email) => {
  const user = userDao.findUserData(email);
  if (user.length === 0) {
    return user;
  } else {
    const err = new Error("중복된 이메일입니다");
    err.statusCode = 409;
    throw err;
  }
};

module.exports = { userSignUp, userSignIn, duplicateEmailCheck };
