import fs from "fs";
import StorageInterface from "App/Domain/Contracts/Storage/StorageInterface";
import File from "App/Domain/Entities/File";
import Application from '@ioc:Adonis/Core/Application'

export default class LocalStorage implements StorageInterface
{
    private static readonly DEFAULT_DIR: string = "/storage/uploads";

    public async upload(file: File, path?: string): Promise<File> 
    {
        if (path) {
            path += `/${file.name}`;
        } else {
            path = `/${file.name}`;
        }
        
        const output = `${LocalStorage.DEFAULT_DIR}${path}`;
        fs.appendFileSync(Application.makePath(output), Buffer.from(file.content));
        file.path = output;

        return file;
    }
}
