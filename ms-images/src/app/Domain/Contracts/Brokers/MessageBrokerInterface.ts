export default interface MessageBrokerInterface
{
    produce(queue: string, payload: object, options?: object): Promise<boolean>;
}
