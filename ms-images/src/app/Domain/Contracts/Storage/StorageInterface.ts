import File from "App/Domain/Entities/File";

export default interface StorageInterface
{
    upload(file: File, path?: string): Promise<File>;
}