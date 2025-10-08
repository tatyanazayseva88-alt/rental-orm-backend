import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors({
		origin: ['https://rental-orm-5kba.vercel.app', 'http://localhost:5173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	})
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
