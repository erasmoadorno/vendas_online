import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProduct1684799588667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'CREATE TABLE `vendas_online`.`product` ( `idproduct` VARCHAR(36) NOT NULL, `category` VARCHAR(36) NOT NULL, `price` DOUBLE NOT NULL, `name` VARCHAR(45) NOT NULL, `image` VARCHAR(60) NOT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (`idproduct`), INDEX `category_idx` (`category` ASC) VISIBLE, CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `vendas_online`.`category` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE product');
  }
}
