import { Controller, Post, Body, Get, Put, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { GearService } from './gear.service'
import { CreateGearDto } from './dto/create-gear.dto'
import { GearEntity } from './entity/gear.entity'

@Controller('gear')
export class GearController {
	constructor(private readonly gearService: GearService) {}

	@Post('create')
	async create(@Body() body: CreateGearDto): Promise<GearEntity> {
		return this.gearService.addGear(body)
	}

	@Get()
	async getAll(): Promise<GearEntity[]> {
		return this.gearService.getAll()
	}

	@Put('update/:id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: CreateGearDto
	): Promise<GearEntity> {
		return this.gearService.updateGear(id, body)
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
		return this.gearService.deleteGear(id)
	}
}
