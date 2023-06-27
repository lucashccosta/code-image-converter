import Image from "../../Entities/Image";
import Uuid from "../../ValueObjects/Uuid";

export default interface ImageRepositoryInterface
{
    list(): Promise<Array<Image>>;
    find(uuid: Uuid): Promise<Image>;
}
