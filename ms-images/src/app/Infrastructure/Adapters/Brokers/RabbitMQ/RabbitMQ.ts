import client, { Channel, Connection } from "amqplib";
import Env from '@ioc:Adonis/Core/Env';

export default class RabbitMQ
{
    public static instance: RabbitMQ;
    protected connection: Connection;
    protected channel: Channel;

    public static async getInstance(): Promise<RabbitMQ>
    {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = await (new RabbitMQ()).connect();
        }

        return RabbitMQ.instance;
    }

    public getConnection(): Connection
    {
        return this.connection;
    }

    public getChannel(): Channel
    {
        return this.channel;
    }

    private constructor() {}

    private async connect(): Promise<RabbitMQ>
    {
        this.connection = await client.connect(Env.get("BROKER_CONNECTION_URL"));
        this.channel = await this.connection.createChannel();

        return this;
    }
}
