// const morgan = require("morgan");
// const logger = require("./serverLogger");
// require("dotenv").config();

// const format = () => {
//   const result = process.env.NODE_ENV === "product" ? "combined" : "dev";
//   return result;
// };

// const stream = {
//   write: (message) => {
//     logger.info(
//       message.replace(
//         /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
//         ""
//       )
//     );
//   },
// };

// const skip = (_, res) => {
//   if (process.env.NODE_ENV === "production") {
//     return res.statusCode < 400;
//   }
// };
// const morganMiddleware = morgan(format(), { stream, skip });

// module.exports = morganMiddleware;
