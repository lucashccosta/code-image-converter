import StorageInterface from "App/Domain/Contracts/Storage/StorageInterface";
import File from "App/Domain/Entities/File";
import MinIO from "./MinIO";
import Env from '@ioc:Adonis/Core/Env';
import { v4 as uuidv4 } from 'uuid';

export default class MinIOStorage implements StorageInterface
{
    private minio: MinIO;

    constructor()
    {
        this.minio = MinIO.getInstance();
    }

    public async upload(file: File, path?: string | undefined): Promise<File> 
    {
        const bucket = Env.get("STORAGE_BUCKET");
        if (!await this.isBucketExists(bucket)) {
            await this.createBucket(bucket);
        }

        const filename = `${uuidv4()}.${file.extension}`;
        if (path) {
            path += `/${filename}`;
        } else {
            path = `/${filename}`;
        }

        await this.sendFile(bucket, path, file);
        file.path = path;

        return file;
    }

    private async isBucketExists(bucket: string): Promise<boolean>
    {
        return await this.minio.getClient().bucketExists(bucket);
    }

    private async createBucket(bucket: string): Promise<void>
    {
        await this.minio.getClient().makeBucket(bucket);
    }

    private async sendFile(bucket: string, path: string, file: File): Promise<void>
    {
        await this.minio.getClient().putObject(bucket, path, Buffer.from(file.content));
    }
}