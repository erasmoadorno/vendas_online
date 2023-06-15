import { CityEntity } from '../../city/entities/city.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  idaddress: string;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'number', nullable: false })
  number: number;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @Column({ name: 'user', nullable: false })
  user: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @ManyToOne(() => UserEntity, (user) => user.userAddresses)
  @JoinColumn({ name: 'user', referencedColumnName: 'iduser' })
  userEnt?: UserEntity;
  @ManyToOne(() => CityEntity, (city) => city.cityAddresses)
  @JoinColumn({ name: 'city', referencedColumnName: 'idCity' })
  cityEnt?: CityEntity;
}
