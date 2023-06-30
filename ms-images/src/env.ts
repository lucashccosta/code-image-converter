/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
  	DRIVE_DISK: Env.schema.enum(['local'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	PG_HOST: Env.schema.string({ format: 'host' }),
    PG_PORT: Env.schema.number(),
    PG_USER: Env.schema.string(),
    PG_PASSWORD: Env.schema.string.optional(),
    PG_DB_NAME: Env.schema.string(),
	STORAGE_SERVICE: Env.schema.string(),
	STORAGE_SERVICE_HOST: Env.schema.string(),
	STORAGE_SERVICE_PORT: Env.schema.number(),
	STORAGE_SSL: Env.schema.string.optional(),
	STORAGE_REGION: Env.schema.string(),
	STORAGE_BUCKET: Env.schema.string(),
	STORAGE_ACCESS_KEY: Env.schema.string(),
	STORAGE_SECRET_KEY: Env.schema.string(),
	BROKER_CONNECTION_URL: Env.schema.string(),
	BROKER_CONSUMER: Env.schema.string.optional(),
})
