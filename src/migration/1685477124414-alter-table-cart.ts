import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCart1685477124414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE `vendas_online`.`cart` ADD COLUMN `active` TINYINT NOT NULL AFTER `userid`;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE `vendas_online`.`cart` DROP COLUMN `active`; ',
    );
  }
}
