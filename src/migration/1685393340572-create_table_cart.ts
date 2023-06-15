import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCart1685393340572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'CREATE TABLE `vendas_online`.`cart` ( `idcart` VARCHAR(36) NOT NULL, `userid` VARCHAR(36) NOT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL, PRIMARY KEY (`idcart`), INDEX `userid_idx` (`userid` ASC) VISIBLE, CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `vendas_online`.`user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE); ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE `cart`');
  }
}
