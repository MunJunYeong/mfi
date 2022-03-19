const winston = require('winston');            // winston lib
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = winston.format;
const logDir = 'logs';

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const myFormat = printf( (info) => {
    return `${info.timestamp} ${info.level}: ${info.message}  data: ${JSON.stringify(info)}`;
});


let logger = new winston.createLogger({
    format : combine (
        timestamp ({
            format : "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat,
    ),
    transports: [ // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
      new winstonDaily({
          level : 'info',
          datePattern : 'YYYY-MM-DD',
          dirname : logDir,
          filename : `%DATE.log`,
          maxFiles : 30,
          zippedArchive : true,
      }),
      //error 레벨 로그 저장할 파일
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      })
    ],
    exitOnError: false, 
});
 
if(process.env.NODE_ENV !== 'development'){
  logger.add(new winston.transports.Console({
      format : winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
      )
  })) // 개발 시 console로도 출력
}
 

module.exports = logger;