import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageSummaryDTO from "../DTOs/Images/ImageSummaryDTO";
import { inject } from "@adonisjs/core/build/standalone";
import ImageRepository from "App/Infrastructure/Adapters/Repositories/LucidOrm/ImageRepository";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import ImageMapper from "../Mappers/ImageMapper";
import LoggerInterface from "App/Domain/Contracts/Loggers/LoggerInterface";
import PinoLogger from "App/Infrastructure/Adapters/Loggers/Pino/PinoLogger";

@inject([PinoLogger, ImageRepository])
export default class ListImageUseCase implements UseCaseInterface<Array<ImageSummaryDTO>>
{
    constructor(
        private readonly logger: LoggerInterface,
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(): Promise<Array<ImageSummaryDTO>>
    {
        this.logger.info("Iniciando solicitação de listagem das imagens.");
        const images = await this.imageRepository.list();
        this.logger.info("Finalizado solicitação de listagem das imagens.", { total: images.length });
        
        return images.map(image => ImageMapper.toSummaryDTO(image));
    }   
}
