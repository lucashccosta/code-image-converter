import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageDetailDTO from "../DTOs/Images/ImageDetailDTO";
import Uuid from "App/Domain/ValueObjects/Uuid";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import ImageMapper from "../Mappers/ImageMapper";
import ImageRepository from "App/Infrastructure/Adapters/LucidORM/Repositories/ImageRepository";
import { inject } from "@adonisjs/core/build/standalone";

@inject([ImageRepository])
export default class DetailImageUseCase implements UseCaseInterface<ImageDetailDTO>
{
    constructor(
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(uuid: Uuid): Promise<ImageDetailDTO>
    {
        const image = await this.imageRepository.find(uuid);
        
        return ImageMapper.toDetailDTO(image);
    }   
}
