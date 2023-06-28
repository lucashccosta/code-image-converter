import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageSummaryDTO from "../DTOs/Images/ImageSummaryDTO";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import StorageInterface from "App/Domain/Contracts/Storage/StorageInterface";
import File from "App/Domain/Entities/File";
import { inject } from "@adonisjs/core/build/standalone";
import LocalStorage from "App/Infrastructure/Adapters/Storage/Local/LocalStorage";
import ImageRepository from "App/Infrastructure/Adapters/Repositories/LucidOrm/ImageRepository";
import ImageMapper from "../Mappers/ImageMapper";
import InvalidArgumentException from "App/Domain/Exceptions/InvalidArgumentException";

@inject([LocalStorage, ImageRepository])
export default class UploadsImageUseCase implements UseCaseInterface<ImageSummaryDTO>
{
    constructor(
        private readonly storageFile: StorageInterface,
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(file: File): Promise<ImageSummaryDTO>
    {
        const fileUploaded = await this.storageFile.upload(file);
        if (!fileUploaded.path) {
            throw new InvalidArgumentException();
        }

        const image = await this.imageRepository.create({ uploadedFile: fileUploaded.path });
        
        return ImageMapper.toSummaryDTO(image);
    }
}
