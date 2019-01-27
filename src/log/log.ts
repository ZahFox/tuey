import { resolve } from 'path'
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'

export namespace Log {
  const CURRENT_DIR = resolve(__dirname)
  const LOG_FILE = `${CURRENT_DIR}/../.logs/tuey.log`

  export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    VERBOSE = 'verbose'
  }

  export interface Logger {
    error: (message: string) => void
    warn: (message: string) => void
    info: (message: string) => void
    debug: (message: string) => void
    verbose: (message: string) => void
  }

  export function init(): Logger {
    const logger: WinstonLogger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.File({ filename: LOG_FILE, level: 'error' }),
        new transports.File({ filename: LOG_FILE })
      ]
    })

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple())
        })
      )
    }

    return {
      error: (message: string) => {
        logger.log({
          level: LogLevel.ERROR,
          message
        })
      },
      warn: (message: string) => {
        logger.log({
          level: LogLevel.WARN,
          message
        })
      },
      info: (message: string) => {
        logger.log({
          level: LogLevel.INFO,
          message
        })
      },
      debug: (message: string) => {
        logger.log({
          level: LogLevel.DEBUG,
          message
        })
      },
      verbose: (message: string) => {
        logger.log({
          level: LogLevel.VERBOSE,
          message
        })
      }
    }
  }
}
