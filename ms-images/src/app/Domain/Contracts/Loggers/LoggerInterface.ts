export default interface LoggerInterface
{
    info(message: string, context?: object): void;
    warning(message: string, context?: object): void;
    error(message: string, exception?: Error, context?: object): void;
}
