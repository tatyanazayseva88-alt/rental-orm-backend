import {
	Controller,
	Post,
	Get,
	Delete,
	Put,
	Param,
	Body,
	ParseIntPipe
} from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post('create')
	async create(@Body() dto: CreateCustomerDto) {
		const customer = await this.customerService.create(dto)
		return { message: 'Customer created', data: customer }
	}

	@Get()
	async getAll() {
		return this.customerService.getAll()
	}

	@Put(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
		const updated = await this.customerService.update(id, body)
		return { message: `Customer #${id} updated`, data: updated }
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		await this.customerService.delete(id)
		return { message: `Customer #${id} deleted` }
	}

	@Put(':id/confirm')
	async confirm(@Param('id', ParseIntPipe) id: number) {
		const updated = await this.customerService.confirmCompletion(id)
		return { message: `Customer #${id} confirmed`, data: updated }
	}

	@Put(':id/close-early')
	async closeEarly(@Param('id', ParseIntPipe) id: number) {
		const updated = await this.customerService.closeEarly(id)
		return { message: `Customer #${id} closed early`, data: updated }
	}
}
