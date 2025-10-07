import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { CustomerGearEntity } from './customer-gear.entity'
import { CustomerSourceEntity } from 'src/customer-source/entity/customer-source.entity'

@Entity('customers')
export class CustomerEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	fullName: string

	@Column()
	phone: string

	@Column({ nullable: true })
	rentalDateTime: string

	@Column({ nullable: true })
	rentalPeriod: string

	@Column({ nullable: true })
	rentalUnit: string

	@Column({ type: 'float', nullable: true })
	totalSum: number

	@Column({ type: 'text', nullable: true })
	description: string

	@OneToMany(() => CustomerGearEntity, cg => cg.customer, { cascade: true })
	customerGears: CustomerGearEntity[]

	@ManyToOne(() => CustomerSourceEntity)
	@JoinColumn({ name: 'source_id' })
	source: CustomerSourceEntity
}
