import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1681761353740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `vendas_online`.`user` (`iduser` VARCHAR(36) NOT NULL,`name` VARCHAR(100) NOT NULL,`email` VARCHAR(200) NOT NULL,`password` VARCHAR(255) NOT NULL,`cpf` VARCHAR(14) NOT NULL,`phone` VARCHAR(14) NULL,PRIMARY KEY (`iduser`),UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
  }
}
