import UseCaseInterface from "App/Domain/Contracts/UseCaseInterface";
import ImageDetailDTO from "../DTOs/Images/ImageDetailDTO";
import Uuid from "App/Domain/ValueObjects/Uuid";
import ImageRepositoryInterface from "App/Domain/Contracts/Repositories/ImageRepositoryInterface";
import ImageMapper from "../Mappers/ImageMapper";
import ImageRepository from "App/Infrastructure/Adapters/Repositories/LucidOrm/ImageRepository";
import { inject } from "@adonisjs/core/build/standalone";
import LoggerInterface from "App/Domain/Contracts/Loggers/LoggerInterface";
import PinoLogger from "App/Infrastructure/Adapters/Loggers/Pino/PinoLogger";

@inject([PinoLogger, ImageRepository])
export default class DetailImageUseCase implements UseCaseInterface<ImageDetailDTO>
{
    constructor(
        private readonly logger: LoggerInterface,
        private readonly imageRepository: ImageRepositoryInterface
    ) {}

    public async handle(uuid: Uuid): Promise<ImageDetailDTO>
    {
        let context = { uuid: uuid.toString() };

        this.logger.info("Iniciando solicitação de detalhe de imagem.", context);
        const image = await this.imageRepository.find(uuid);
        this.logger.info("Finalizado solicitação de detalhe de imagem.", Object.assign(context, image));
        
        return ImageMapper.toDetailDTO(image);
    }   
}
