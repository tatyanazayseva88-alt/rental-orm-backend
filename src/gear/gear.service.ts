import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GearEntity } from './entity/gear.entity'
import { CreateGearDto } from './dto/create-gear.dto'
import { CustomerGearEntity } from 'src/customer/entity/customer-gear.entity'

@Injectable()
export class GearService {
	constructor(
		@InjectRepository(GearEntity)
		private readonly gearRepo: Repository<GearEntity>,
		@InjectRepository(CustomerGearEntity)
		private readonly customerGearRepo: Repository<CustomerGearEntity>
	) {}

	async addGear(item: CreateGearDto) {
		const newGear = this.gearRepo.create(item)
		return this.gearRepo.save(newGear)
	}

	async getAll() {
		return this.gearRepo.find()
	}

	async updateGear(id: number, item: CreateGearDto) {
		const gear = await this.gearRepo.findOne({ where: { id } })
		if (!gear) throw new NotFoundException('Gear not found')
		Object.assign(gear, item)
		return this.gearRepo.save(gear)
	}

	async deleteGear(id: number) {
		const gear = await this.gearRepo.findOne({
			where: { id },
			relations: ['customerGears']
		})
		if (!gear) throw new NotFoundException('Gear not found')

		if (gear.customerGears?.length) {
			await this.customerGearRepo.remove(gear.customerGears)
		}

		await this.gearRepo.remove(gear)
		return { message: 'Gear deleted successfully' }
	}
}
