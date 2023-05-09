import { AddressEntity } from 'src/address/entities/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  iduser: string;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'password', nullable: false })
  password: string;
  @Column({ name: 'cpf', nullable: false })
  cpf: string;
  @Column({ name: 'phone', nullable: true })
  phone: string;
  @OneToMany(() => AddressEntity, (address) => address.userEnt)
  userAddresses?: AddressEntity[];
}
