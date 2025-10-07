import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	ParseIntPipe
} from '@nestjs/common'
import { CustomerSourceService } from './customer-source.service'
import { CreateCustomerSourceDto } from './dto/create-customer-source.dto'
import { UpdateCustomerSourceDto } from './dto/update-customer-source.dto'

@Controller('customer-sources')
export class CustomerSourceController {
	constructor(private readonly sourceService: CustomerSourceService) {}

	@Post()
	create(@Body() dto: CreateCustomerSourceDto) {
		return this.sourceService.create(dto)
	}

	@Get()
	findAll() {
		return this.sourceService.findAll()
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateCustomerSourceDto
	) {
		return this.sourceService.update(id, dto)
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.sourceService.remove(id)
	}
}
