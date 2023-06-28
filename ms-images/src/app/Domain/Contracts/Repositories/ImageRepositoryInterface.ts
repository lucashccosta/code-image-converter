import Image from "../../Entities/Image";
import Uuid from "../../ValueObjects/Uuid";

interface CreateInput
{
    uploadedFile: string
}

export default interface ImageRepositoryInterface
{
    list(): Promise<Array<Image>>;
    find(uuid: Uuid): Promise<Image>;
    create(data: CreateInput): Promise<Image>;
}
