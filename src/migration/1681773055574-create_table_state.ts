import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableState1681773055574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `vendas_online`.`state` (`idstate` INT NOT NULL, `name` VARCHAR(60) NOT NULL, `uf` VARCHAR(2) NOT NULL, PRIMARY KEY (`idstate`));',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE state');
  }
}
