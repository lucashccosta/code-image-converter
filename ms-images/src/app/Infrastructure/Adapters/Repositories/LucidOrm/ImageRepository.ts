import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import ImageEntity from "App/Domain/Entities/Image";
import Uuid from "App/Domain/ValueObjects/Uuid";
import ImageModel from "./Models/Image";
import ImageFactory from "App/Domain/Factories/ImageFactory";
import { StatusEnum } from "App/Domain/Enums/Images/StatusEnum";

export default class ImageRepository implements ImageRepositoryInterface
{
    public async list(): Promise<Array<ImageEntity>>
    {
        const images = await ImageModel.all();

        return images.map(image => ImageFactory.fromObject(image)); 
    }

    public async find(uuid: Uuid): Promise<ImageEntity> 
    {
        const image = await ImageModel.findByOrFail("uuid", uuid.toString());
        
        return ImageFactory.fromObject(image);
    }

    public async create({ uploadedFile }): Promise<ImageEntity> 
    {
        const image = await ImageModel.create({ uploadedFile, status: StatusEnum.PROCESSING });
        
        return ImageFactory.fromObject(image);
    }
}
