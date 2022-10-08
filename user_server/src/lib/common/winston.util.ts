import { utilities, WinstonModule } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs';

const dailyOptions = (level: string) => {
    return {
      level,
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + `/${level}`,
      filename: `%DATE%.${level}.log`,
      maxFiles: 30, //30일치 로그파일 저장
      zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    };
};

// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
    transports : [
        new winston.transports.Console({
            level: env === 'local' ? 'debug' : 'http',
            format : env === 'local' ? 
                winston.format.combine(
                    winston.format.timestamp(),
                    utilities.format.nestLike('local', {
                        prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
                    }),
                )
                : 
                winston.format.simple()
        }),
        new winstonDaily(dailyOptions('info')),
        new winstonDaily(dailyOptions('warn')),
        new winstonDaily(dailyOptions('error')),
    ]
})

