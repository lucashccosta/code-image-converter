import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageSummaryDTO from "../DTOs/Images/ImageSummaryDTO";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import StorageInterface from "App/Domain/Contracts/Storage/StorageInterface";
import File from "App/Domain/Entities/File";
import { inject } from "@adonisjs/core/build/standalone";
import ImageRepository from "App/Infrastructure/Adapters/Repositories/LucidOrm/ImageRepository";
import ImageMapper from "../Mappers/ImageMapper";
import InvalidArgumentException from "App/Domain/Exceptions/InvalidArgumentException";
import MinIOStorage from "App/Infrastructure/Adapters/Storage/MinIO/MinIOStorage";
import MessageBrokerInterface from "App/Domain/Contracts/Brokers/MessageBrokerInterface";
import RabbitMQBroker from "App/Infrastructure/Adapters/Brokers/RabbitMQ/RabbitMQBroker";
import Env from '@ioc:Adonis/Core/Env';

@inject([MinIOStorage, RabbitMQBroker, ImageRepository])
export default class UploadsImageUseCase implements UseCaseInterface<ImageSummaryDTO>
{
    constructor(
        private readonly storageAdapter: StorageInterface,
        private readonly brokerAdapter: MessageBrokerInterface,
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(file: File): Promise<ImageSummaryDTO>
    {
        const fileUploaded = await this.storageAdapter.upload(file, "/png");
        if (!fileUploaded.path) {
            throw new InvalidArgumentException();
        }

        const image = await this.imageRepository.create({ uploadedFile: fileUploaded.path });
        await this.brokerAdapter.produce(
            "images.uploaded.queue",
            { storage: Env.get("STORAGE_SERVICE"), uuid: image.uuid.toString(), url: image.uploadedFile },
            { exchange: "images.exchange", routingKey: "image-uploaded" }
        );
        
        return ImageMapper.toSummaryDTO(image);
    }
}
