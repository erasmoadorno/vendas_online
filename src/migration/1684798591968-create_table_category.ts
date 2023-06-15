import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategory1684798591968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'CREATE TABLE `vendas_online`.`category`(`idcategory` VARCHAR(36) NOT NULL,`name` VARCHAR(45) NOT NULL, `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (`idcategory`));',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE `category`');
  }
}
