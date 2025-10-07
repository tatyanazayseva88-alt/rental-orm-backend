import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomerSourceEntity } from './entity/customer-source.entity'
import { CreateCustomerSourceDto } from './dto/create-customer-source.dto'
import { UpdateCustomerSourceDto } from './dto/update-customer-source.dto'

@Injectable()
export class CustomerSourceService {
	constructor(
		@InjectRepository(CustomerSourceEntity)
		private readonly sourceRepo: Repository<CustomerSourceEntity>
	) {}

	async create(dto: CreateCustomerSourceDto) {
		const exists = await this.sourceRepo.findOne({ where: { name: dto.name } })

		if (exists) return

		const source = this.sourceRepo.create(dto)
		return this.sourceRepo.save(source)
	}

	findAll() {
		return this.sourceRepo.find()
	}

	async update(id: number, dto: UpdateCustomerSourceDto) {
		const source = await this.sourceRepo.findOne({ where: { id } })
		if (!source) throw new NotFoundException('Source not found')
		Object.assign(source, dto)
		return this.sourceRepo.save(source)
	}

	async remove(id: number) {
		const source = await this.sourceRepo.findOne({ where: { id } })
		if (!source) throw new NotFoundException('Source not found')
		return this.sourceRepo.remove(source)
	}
}
