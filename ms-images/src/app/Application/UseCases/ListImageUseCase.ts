import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageSummaryDTO from "../DTOs/Images/ImageSummaryDTO";
import { inject } from "@adonisjs/core/build/standalone";
import ImageRepository from "App/Infrastructure/Adapters/LucidORM/Repositories/ImageRepository";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import ImageMapper from "../Mappers/ImageMapper";

@inject([ImageRepository])
export default class ListImageUseCase implements UseCaseInterface<Array<ImageSummaryDTO>>
{
    constructor(
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(): Promise<Array<ImageSummaryDTO>>
    {
        const images = await this.imageRepository.list();
        
        return images.map(image => ImageMapper.toSummaryDTO(image));
    }   
}
