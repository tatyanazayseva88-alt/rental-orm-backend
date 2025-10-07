export class CreateCustomerDto {
	fullName: string
	phone: string
	rentalDateTime?: string
	rentalPeriod?: string
	rentalUnit?: string
	description?: string
	sourceId?: number
	gears?: {
		gear_id: number
		count: number
	}[]
}
