import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GearModule } from './gear/gear.module'
import { join } from 'path'
import { CustomerModule } from './customer/customer.module'
import { CustomerSourceModule } from './customer-source/customer-source.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: join(__dirname, '..', 'database.db'),
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		GearModule,
		CustomerModule,
		CustomerSourceModule
	]
})
export class AppModule {}
