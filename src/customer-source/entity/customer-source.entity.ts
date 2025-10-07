import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('customer_sources')
export class CustomerSourceEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string
}
