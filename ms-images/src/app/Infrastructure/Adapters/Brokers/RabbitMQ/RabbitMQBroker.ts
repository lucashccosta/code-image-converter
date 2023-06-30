import MessageBrokerInterface from "App/Domain/Contracts/Brokers/MessageBrokerInterface";
import RabbitMQ from "./RabbitMQ";

export default class RabbitMQBroker implements MessageBrokerInterface
{
    public async produce(queue: string, payload: object, { exchange, routingKey }: object): Promise<boolean> 
    {
        const rabbitmq = await RabbitMQ.getInstance();
        
        return rabbitmq.getChannel().publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));
    }
}
