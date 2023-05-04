import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1681773530371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `vendas_online`.`address` (`idaddress` VARCHAR(36) NOT NULL, `complement` VARCHAR(45) NULL,`number` INT NOT NULL, `cep` VARCHAR(9) NOT NULL, `user` VARCHAR(36) NOT NULL, `city` INT NOT NULL, PRIMARY KEY (`idaddress`), UNIQUE INDEX `idaddress_UNIQUE` (`idaddress` ASC) VISIBLE, INDEX `user_idx` (`user` ASC) VISIBLE, INDEX `city_idx` (`city` ASC) VISIBLE, CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `vendas_online`.`user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `city` FOREIGN KEY (`city`) REFERENCES `vendas_online`.`city` (`idcity`) ON DELETE CASCADE ON UPDATE CASCADE); ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `address`');
  }
}
