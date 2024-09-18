import Express from 'express'
import winston from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

class Log {
  static logger = Log.generateLogger()

  static getLogDir() {
    return process.env.LOG_DIR ?? '/var/log/express'
  }

  private static generateLogger() {
    const logger = winston.createLogger({
      level: 'verbose',
      format: winston.format.json(),
      defaultMeta: { time: new Date() },
    })

    if (process.env.NODE_ENV === 'production') {
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/error-%DATE%.log'), level: 'error', zippedArchive: true })) // Error only log
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/warn-%DATE%.log'), level: 'warn', zippedArchive: true })) // Warning only log
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/info-%DATE%.log'), level: 'info', zippedArchive: true })) // Info only log
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/http-%DATE%.log'), level: 'http', zippedArchive: true })) // Http only log
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/verbose-%DATE%.log'), level: 'verbose', zippedArchive: true })) // Verbose only log
      logger.add(new winston.transports.DailyRotateFile({ filename: path.join(this.getLogDir(), 'winston/combined-%DATE%.log'), zippedArchive: true })) // All messages log
    } else {
      logger.add(new winston.transports.Console({ format: winston.format.prettyPrint(), level: 'silly' }))
    }

    return logger
  }

  static log(req: Express.Request, status: number, error: unknown | null = null) {
    let info = {}

    if (process.env.NODE_ENV === 'production') {
      info = {
        method: req.method,
        path: req.path,
        status,
        ip: req.ip ?? req.connection.remoteAddress,
        http: req.httpVersion,
        userAgent: req.get('user-agent'),
        error,
      }
    } else {
      info = {
        method: req.method,
        path: req.path,
        status,
        error,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        request: req.method === 'GET' ? req.query : req.body,
      }
    }

    if (status >= 500) {
      Log.logger.error('Server Error', info)
    } else if (status >= 400) {
      Log.logger.info('Client Error', info)
    } else if (status >= 300) {
      Log.logger.http('Redirection', info)
    } else if (status >= 200) {
      Log.logger.http('Success', info)
    } else if (status >= 100) {
      Log.logger.http('Informal Response', info)
    }
  }

  static silly(message: string, object: unknown | null = null) {
    Log.logger.silly(message, object)
  }

  static debug(message: string, object: unknown | null = null) {
    Log.logger.debug(message, object)
  }

  static verbose(message: string, object: unknown | null = null) {
    Log.logger.verbose(message, object)
  }

  static http(message: string, object: unknown | null = null) {
    Log.logger.http(message, object)
  }

  static info(message: string, object: unknown | null = null) {
    Log.logger.info(message, object)
  }

  static warn(message: string, object: unknown | null = null) {
    Log.logger.warn(message, object)
  }

  static error(message: string, object: unknown | null = null) {
    Log.logger.error(message, object)
  }
}

export default Log
