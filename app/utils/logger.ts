type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'

interface LogAttributes {
    [key: string]: any
}

const LOG_LEVELS: Record<LogLevel, number> = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    FATAL: 4
}

export class Logger {
    private static instance: Logger | null = null

    private level: LogLevel
    private context: string = 'app'

    constructor(level: LogLevel = 'INFO') {
        this.level = level
    }

    static getInstance(level?: LogLevel): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(level || 'INFO')
        }
        return Logger.instance
    }

    static error(msg: string, attrs: LogAttributes = {}): void {
        const logger = Logger.getInstance()
        logger.error(msg, attrs)
    }

    static warn(msg: string, attrs: LogAttributes = {}): void {
        const logger = Logger.getInstance()
        logger.warn(msg, attrs)
    }

    static info(msg: string, attrs: LogAttributes = {}): void {
        const logger = Logger.getInstance()
        logger.info(msg, attrs)
    }

    static debug(msg: string, attrs: LogAttributes = {}): void {
        const logger = Logger.getInstance()
        logger.debug(msg, attrs)
    }
    setLevel(level: string): void {
        if (level in LOG_LEVELS) {
            this.level = level as LogLevel
        } else {
            this.level = 'INFO'
        }
    }


    log(level: LogLevel, msg: string, attrs: LogAttributes = {}): void {
        if (LOG_LEVELS[level] < LOG_LEVELS[this.level]) {
            return
        }

        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        const timestamp = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

        let output = `[${this.context}] ${timestamp} level=${level}`
        if (msg) {
            output += ` msg="${msg}"`
        }

        if (Object.keys(attrs).length > 0) {
            const attrsStr = Object.entries(attrs)
                .map(([key, value]) => `${key}=${value}`)
                .join(' ')

            output += ` ${attrsStr}`
        }

        const method = level === 'DEBUG' ? 'debug' :
        level === 'INFO' ? 'info' :
            level === 'WARN' ? 'warn' : 'error'

        console[method](output)
    }

    debug(msg: string, attrs: LogAttributes = {}): void {
        this.log('DEBUG', msg, attrs)
    }

    info(msg: string, attrs: LogAttributes = {}): void {
        this.log('INFO', msg, attrs)
    }

    warn(msg: string, attrs: LogAttributes = {}): void {
        this.log('WARN', msg, attrs)
    }

    error(msg: string, attrs: LogAttributes = {}): void {
        this.log('ERROR', msg, attrs)
    }

    fatal(msg: string, attrs: LogAttributes = {}): void {
        this.log('FATAL', msg, attrs)
    }

    with(attrs: LogAttributes): Logger {
        const childLogger = Object.create(this) as Logger

        const originalLog = this.log.bind(this)
        childLogger.log = (level: LogLevel, msg: string, additionalAttrs: LogAttributes = {}): void => {
            originalLog(level, msg, { ...attrs, ...additionalAttrs })
        }

        childLogger.debug = (msg: string, additionalAttrs: LogAttributes = {}): void =>
            childLogger.log('DEBUG', msg, additionalAttrs)

        childLogger.info = (msg: string, additionalAttrs: LogAttributes = {}): void =>
            childLogger.log('INFO', msg, additionalAttrs)

        childLogger.warn = (msg: string, additionalAttrs: LogAttributes = {}): void =>
            childLogger.log('WARN', msg, additionalAttrs)

        childLogger.error = (msg: string, additionalAttrs: LogAttributes = {}): void =>
            childLogger.log('ERROR', msg, additionalAttrs)

        childLogger.fatal = (msg: string, additionalAttrs: LogAttributes = {}): void =>
            childLogger.log('FATAL', msg, additionalAttrs)

        return childLogger
    }
}

export function getLogger(level?: LogLevel): Logger {
    return Logger.getInstance(level)
}