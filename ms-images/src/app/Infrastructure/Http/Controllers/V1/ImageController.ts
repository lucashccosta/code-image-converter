import { inject } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetailImageUseCase from 'App/Application/UseCases/DetailImageUseCase';
import ListImageUseCase from 'App/Application/UseCases/ListImageUseCase';
import Uuid from 'App/Domain/ValueObjects/Uuid';

@inject([ListImageUseCase, DetailImageUseCase])
export default class ImageController
{
    constructor(
        private readonly listImageUseCase: ListImageUseCase,
        private readonly detailImageUseCase: DetailImageUseCase
    ) {}

    public async index({ response }: HttpContextContract)
    {
        const images = await this.listImageUseCase.handle();
        
        return response.json(images);
    }

    public async store({ request, response }: HttpContextContract)
    {
        return response.json({ path: "store" });
    }

    public async show({ request, response }: HttpContextContract)
    {
        const uuid = Uuid.fromString(request.param("uuid"));
        const image = await this.detailImageUseCase.handle(uuid);

        return response.json(image);
    }
}
