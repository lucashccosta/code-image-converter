import Logger from '@ioc:Adonis/Core/Logger'
import LoggerInterface from "App/Domain/Contracts/Loggers/LoggerInterface";

export default class PinoLogger implements LoggerInterface
{
    public info(message: string, context?: object): void 
    {
        Logger.info({ context: context }, message);
    }

    public warning(message: string, context?: object): void 
    {
        Logger.warn({ context: context }, message);
    }

    public error(message: string, exception?: Error, context?: object): void 
    {
        Logger.error({ context: context, error: exception }, message);
    }
}
