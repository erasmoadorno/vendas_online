import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductCart1685399566044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'CREATE TABLE `vendas_online`.`cart_Product` ( `id_cart_product` VARCHAR(36) NOT NULL, `cartid` VARCHAR(36) NOT NULL, `productid` VARCHAR(36) NOT NULL, `amount` INT NOT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL, PRIMARY KEY (`id_cart_product`), INDEX `product_idx` (`productid` ASC) VISIBLE, CONSTRAINT `product` FOREIGN KEY (`productid`) REFERENCES `vendas_online`.`product` (`idproduct`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `cart` FOREIGN KEY (`cartid`) REFERENCES `vendas_online`.`cart` (`idcart`) ON DELETE CASCADE ON UPDATE CASCADE);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE `cart-product`');
  }
}
