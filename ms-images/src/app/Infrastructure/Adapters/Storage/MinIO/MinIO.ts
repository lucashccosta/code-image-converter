import { Client } from "minio";
import Env from '@ioc:Adonis/Core/Env';

export default class MinIO
{
    public readonly client: Client;

    constructor() 
    {
        this.client = new Client({
            endPoint: Env.get("STORAGE_SERVICE_HOST"),
            port: Env.get("STORAGE_SERVICE_PORT", 9000),
            useSSL: Env.get("STORAGE_SSL", false),
            accessKey: Env.get("STORAGE_ACCESS_KEY"),
            secretKey: Env.get("STORAGE_SECRET_KEY"),
        });
    }
}