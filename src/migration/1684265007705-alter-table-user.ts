import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1684265007705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE `vendas_online`.`user` ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE;;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('');
  }
}
