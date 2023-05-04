import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCity1681773517356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `vendas_online`.`city` (`idcity` INT NOT NULL, `name` VARCHAR(60) NOT NULL,`state` INT NULL, PRIMARY KEY (`idcity`), INDEX `state_idx` (`state` ASC) VISIBLE, CONSTRAINT `state` FOREIGN KEY (`state`) REFERENCES `vendas_online`.`state` (`idstate`) ON DELETE CASCADE ON UPDATE CASCADE);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `city`');
  }
}
