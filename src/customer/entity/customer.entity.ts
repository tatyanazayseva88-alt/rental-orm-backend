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

	@Column({ type: 'datetime', nullable: true })
	rentalStart: Date | null

	@Column({ type: 'datetime', nullable: true })
	rentalEnd: Date | null

	@Column({ type: 'float', nullable: true })
	totalSum: number

	@Column({ type: 'float', default: 0 })
	discount: number

	@Column({ type: 'text', nullable: true })
	description: string

	@Column({ type: 'boolean', default: false })
	completed: boolean

	@OneToMany(() => CustomerGearEntity, cg => cg.customer, { cascade: true })
	customerGears: CustomerGearEntity[]

	@ManyToOne(() => CustomerSourceEntity)
	@JoinColumn({ name: 'source_id' })
	source: CustomerSourceEntity
}
