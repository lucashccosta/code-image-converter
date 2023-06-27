import Image from "../Entities/Image";

export default class ImageFactory
{
    public static fromObject({ id, uuid, status, uploadedFile, convertedFile, createdAt, updatedAt }): Image
    {
        return new Image(
            id, 
            uuid, 
            status,
            uploadedFile,
            convertedFile,
            new Date(createdAt),
            new Date(updatedAt)
        );
    }
}
