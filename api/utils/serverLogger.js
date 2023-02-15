// const winston = require("winston");
// const winstonDaily = require("winston-daily-rotate-file");
// const process = require("process");
// const os = require("os");

// const logDir = "./logs";

// const { combine, timestamp, label, printf } = winston.format;

// const getServerIp = () => {
//   let ifaces = os.networkInterfaces();
//   let result = "";
//   for (let dev in ifaces) {
//     let alias = 0;
//     ifaces[dev].forEach(function (details) {
//       if (details.family == "IPv4" && details.internal === false) {
//         result = details.address;
//         ++alias;
//       }
//     });
//   }
//   return result;
// };
// const logFormat = printf(({ level, message, label, timestamp }) => {
//   return `[${label}]:${timestamp}:${getServerIp()}: ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
// });

// const logger = winston.createLogger({
//   format: combine(
//     timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     label({ label: "ONECUE log" }),
//     logFormat
//   ),

//   transports: [
//     new winstonDaily({
//       level: "info",
//       datePattern: "YYYY-MM-DD", // 파일 날짜 형식
//       dirname: logDir, // 파일 경로
//       filename: `%DATE%.log`, // 파일 이름
//       maxFiles: 30, // 최근 30일치 로그 파일을 남김
//       zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
//     }),

//     new winstonDaily({
//       level: "error", // error 레벨에선
//       datePattern: "YYYY-MM-DD",
//       dirname: logDir + "/error", // /logs/error 하위에 저장
//       filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
//       maxFiles: 30,
//       zippedArchive: true,
//     }),
//   ],

//   exceptionHandlers: [
//     new winstonDaily({
//       level: "error",
//       datePattern: "YYYY-MM-DD",
//       dirname: logDir,
//       filename: `%DATE%.exception.log`,
//       maxFiles: 30,
//       zippedArchive: true,
//     }),
//   ],
// });

// // if (process.env.NODE_ENV !== "production") {
// //   logger.add(
// //     new winston.transports.Console({
// //       format: winston.format.combine(
// //         winston.format.colorize(), // 색깔 넣어서 출력
// //         winston.format.simple()
// //       ),
// //     })
// //   );
// // }

// module.exports = logger;
