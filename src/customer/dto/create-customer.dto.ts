export class CreateCustomerDto {
	fullName: string
	phone: string
	sourceId: number
	rentalStart?: string
	rentalEnd?: string
	description?: string
	discount?: number
	gears?: {
		gear_id: number
		count: number
		days?: number
	}[]
}
