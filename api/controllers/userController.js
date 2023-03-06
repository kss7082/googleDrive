const userService = require("../services/userService");

const { asyncErrorHandler } = require("../utils/error");
//회원가입
const userSignUp = async (req, res) => {
  const { id, password, name, phoneNumber } = req.body;
  await userService.userSignUp(id, password, name, phoneNumber);
  return res.status(201).json({ message: "회원가입 완료" });
};
// 로그인

const userSignIn = async (req, res) => {
  const { id, password } = req.body;
  const token = await userService.userSignIn(id, password);
  return res.status(200).json({ token });
};

// 문자인증 (완료, 혹은 아이디찾기))
const verifyCode = asyncErrorHandler(async (req, res) => {
  const { phoneNumber, code, userName } = req.query;
  const result = await userService.verifyCode(phoneNumber, code, userName);
  return res.status(200).json({ message: result });
});
//비밀번호 찾기 후 변경
const patchPassword = asyncErrorHandler(async (req, res) => {
  const { id, password } = req.body;
  await userService.patchPassword(password, id);
  return res.status(201).json({ message: "비밀번호 변경완료" });
});
// 이메일 중복체크
const checkDuplicateId = asyncErrorHandler(async (req, res) => {
  const { id } = req.query;
  const result = await userService.checkDuplicateId(id);
  return res.status(200).json({ message: result });
});

module.exports = {
  userSignUp,
  userSignIn,
  verifyCode,
  patchPassword,
  checkDuplicateId,
};