import { CityEntity } from 'src/city/entities/city.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'State' })
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  idstate: number;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'uf', nullable: false })
  uf: string;
  @OneToMany(() => CityEntity, (city) => city.cityEnt)
  cities?: CityEntity;
}
