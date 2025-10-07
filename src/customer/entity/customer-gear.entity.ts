import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { CustomerEntity } from './customer.entity'
import { GearEntity } from 'src/gear/entity/gear.entity'

@Entity('customer_gears')
export class CustomerGearEntity {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => CustomerEntity, customer => customer.customerGears)
	@JoinColumn({ name: 'customer_id' })
	customer: CustomerEntity

	@ManyToOne(() => GearEntity, gear => gear.customerGears, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'gear_id' })
	gear: GearEntity

	@Column()
	count: number
}
