import { CityEntity } from '../../city/entities/city.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'State' })
export class StateEntity {
  @PrimaryGeneratedColumn('uuid')
  idstate: string;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'uf', nullable: false })
  uf: string;
  @OneToMany(() => CityEntity, (city) => city.stateEnt)
  cities?: CityEntity[];
}
