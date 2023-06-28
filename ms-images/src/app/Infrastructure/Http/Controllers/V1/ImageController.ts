import fs from "fs";
import { inject } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetailImageUseCase from 'App/Application/UseCases/DetailImageUseCase';
import ListImageUseCase from 'App/Application/UseCases/ListImageUseCase';
import UploadsImageUseCase from 'App/Application/UseCases/UploadImageUseCase';
import File from 'App/Domain/Entities/File';
import Uuid from 'App/Domain/ValueObjects/Uuid';

@inject([ListImageUseCase, DetailImageUseCase, UploadsImageUseCase])
export default class ImageController
{
    constructor(
        private readonly listImageUseCase: ListImageUseCase,
        private readonly detailImageUseCase: DetailImageUseCase,
        private readonly uploadImageUseCase: UploadsImageUseCase
    ) {}

    public async index({ response }: HttpContextContract)
    {
        const images = await this.listImageUseCase.handle();
        
        return response.json(images);
    }

    public async store({ request, response }: HttpContextContract)
    {   
        const requestFile = request.file("image");
        if (!requestFile) {
            throw new Error("400 Bad Request.");
        }

        const file = new File(
            requestFile.clientName,
            requestFile.size,
            requestFile.type ?? "image",
            requestFile?.extname ?? "png",
            Buffer.from(fs.readFileSync(requestFile?.tmpPath ?? "", { encoding: "binary" }))
        );
        
        const image = await this.uploadImageUseCase.handle(file);

        return response.json(image);
    }

    public async show({ request, response }: HttpContextContract)
    {
        const uuid = Uuid.fromString(request.param("uuid"));
        const image = await this.detailImageUseCase.handle(uuid);

        return response.json(image);
    }
}
