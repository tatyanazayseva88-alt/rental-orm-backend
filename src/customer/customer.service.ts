import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { CustomerEntity } from './entity/customer.entity'
import { GearEntity } from 'src/gear/entity/gear.entity'
import { CustomerSourceEntity } from 'src/customer-source/entity/customer-source.entity'
import { CreateCustomerDto } from './dto/create-customer.dto'

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(CustomerEntity)
		private readonly customerRepo: Repository<CustomerEntity>,

		@InjectRepository(GearEntity)
		private readonly gearRepo: Repository<GearEntity>,

		@InjectRepository(CustomerSourceEntity)
		private readonly sourceRepo: Repository<CustomerSourceEntity>
	) {}

	async create(dto: CreateCustomerDto) {
		const source = await this.sourceRepo.findOne({
			where: { id: dto.sourceId }
		})
		if (!source) throw new NotFoundException('Source not found')

		const customer = this.customerRepo.create({
			fullName: dto.fullName,
			phone: dto.phone,
			rentalStart: dto.rentalStart ? new Date(dto.rentalStart) : null,
			rentalEnd: dto.rentalEnd ? new Date(dto.rentalEnd) : null,
			description: dto.description,
			source
		})

		if (dto.gears?.length) {
			const gearIds = dto.gears.map(g => g.gear_id)
			const gears = await this.gearRepo.find({ where: { id: In(gearIds) } })
			customer.customerGears = dto.gears.map(g => ({
				gear: gears.find(x => x.id === g.gear_id)!,
				count: g.count
			})) as any
		}

		return this.customerRepo.save(customer)
	}

	async getAll() {
		const customers = await this.customerRepo.find({
			relations: ['customerGears', 'customerGears.gear', 'source']
		})

		return customers.map(c => ({
			...c,
			totalSum:
				c.totalSum ??
				c.customerGears?.reduce(
					(sum, g) => sum + (g.gear?.price ?? 0) * g.count,
					0
				) ??
				0,
			gears:
				c.customerGears?.map(cg => ({
					gear_id: cg.gear.id,
					count: cg.count
				})) ?? []
		}))
	}

	async update(
		id: number,
		data: {
			fullName?: string
			phone?: string
			totalSum?: number
			description?: string
			rentalStart?: string
			rentalEnd?: string
		}
	) {
		const customer = await this.customerRepo.findOne({
			where: { id },
			relations: ['customerGears', 'customerGears.gear', 'source']
		})
		if (!customer) throw new NotFoundException('Customer not found')

		if (data.fullName !== undefined) customer.fullName = data.fullName
		if (data.phone !== undefined) customer.phone = data.phone
		if (data.totalSum !== undefined) customer.totalSum = data.totalSum
		if (data.description !== undefined) customer.description = data.description
		if (data.rentalStart !== undefined)
			customer.rentalStart = data.rentalStart
				? new Date(data.rentalStart)
				: null
		if (data.rentalEnd !== undefined)
			customer.rentalEnd = data.rentalEnd ? new Date(data.rentalEnd) : null

		return this.customerRepo.save(customer)
	}

	async delete(id: number) {
		const customer = await this.customerRepo.findOne({
			where: { id },
			relations: ['customerGears']
		})
		if (!customer) throw new NotFoundException('Customer not found')

		if (customer.customerGears?.length) {
			await this.customerRepo.manager.remove(customer.customerGears)
		}

		return this.customerRepo.remove(customer)
	}

	async confirmCompletion(id: number) {
		const customer = await this.customerRepo.findOne({ where: { id } })
		if (!customer) throw new NotFoundException('Customer not found')
		customer.completed = true
		return this.customerRepo.save(customer)
	}

	async closeEarly(id: number) {
		const customer = await this.customerRepo.findOne({ where: { id } })
		if (!customer) throw new NotFoundException('Customer not found')
		customer.rentalEnd = new Date()
		customer.completed = true
		return this.customerRepo.save(customer)
	}
}
