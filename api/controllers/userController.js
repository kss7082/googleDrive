const userService = require("../services/userService");

const userSignUp = async (req, res) => {
  const { id, password, email, phoneNumber, address } = req.body;
  await userService.userSignUp(id, password, email, phoneNumber, address);
  return res.status(201).json({ message: "회원가입 완료" });
};

const userSignIn = async (req, res) => {
  const { id, password } = req.body;
  const token = await userService.userSignIn(id, password);
  return res.status(200).json({ token });
};

const duplicateEmailCheck = async (req, res) => {
  const { email } = req.params;
  await userService.duplicateEmailCheck(email);
  return res.status(200).json({ message: "사용가능한 이메일입니다." });
};
module.exports = { userSignUp, userSignIn, duplicateEmailCheck };
