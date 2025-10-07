import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GearService } from './gear.service'
import { GearController } from './gear.controller'
import { GearEntity } from './entity/gear.entity'
import { CustomerGearEntity } from 'src/customer/entity/customer-gear.entity'

@Module({
	imports: [TypeOrmModule.forFeature([GearEntity, CustomerGearEntity])],
	providers: [GearService],
	controllers: [GearController]
})
export class GearModule {}
