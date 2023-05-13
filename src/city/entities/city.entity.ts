import { AddressEntity } from 'src/address/entities/address.entity';
import { StateEntity } from 'src/state/entities/state.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'City' })
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  idCity: string;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'state', nullable: false })
  state: string;
  @OneToMany(() => AddressEntity, (address) => address.cityEnt)
  cityAddresses?: AddressEntity[];
  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state', referencedColumnName: 'idstate' })
  stateEnt?: StateEntity;
}
