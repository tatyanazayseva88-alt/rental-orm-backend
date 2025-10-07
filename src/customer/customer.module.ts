import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'
import { CustomerEntity } from './entity/customer.entity'
import { GearEntity } from 'src/gear/entity/gear.entity'
import { CustomerSourceEntity } from 'src/customer-source/entity/customer-source.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([CustomerEntity, GearEntity, CustomerSourceEntity])
	],
	providers: [CustomerService],
	controllers: [CustomerController]
})
export class CustomerModule {}
