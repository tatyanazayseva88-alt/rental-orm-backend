import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerSourceEntity } from './entity/customer-source.entity'
import { CustomerSourceService } from './customer-source.service'
import { CustomerSourceController } from './customer-source.controller'

@Module({
	imports: [TypeOrmModule.forFeature([CustomerSourceEntity])],
	providers: [CustomerSourceService],
	controllers: [CustomerSourceController],
	exports: [CustomerSourceService]
})
export class CustomerSourceModule {}
