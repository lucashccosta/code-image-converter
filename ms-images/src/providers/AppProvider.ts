import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ImageRepository from 'App/Infrastructure/Adapters/LucidORM/Repositories/ImageRepository'

export default class AppProvider {
  constructor (
    protected app: ApplicationContract
  ) {}

  public register () 
  {
  }

  public async boot () 
  {
  }

  public async ready () 
  {
  }

  public async shutdown () 
  {
  }
}
