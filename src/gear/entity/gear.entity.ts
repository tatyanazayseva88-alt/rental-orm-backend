import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { CustomerGearEntity } from 'src/customer/entity/customer-gear.entity'

@Entity('gears')
export class GearEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	price: number

	@Column()
	count: number

	@Column({ type: 'float', nullable: true })
	purchasePrice: number

	@OneToMany(() => CustomerGearEntity, cg => cg.gear)
	customerGears: CustomerGearEntity[]
}
