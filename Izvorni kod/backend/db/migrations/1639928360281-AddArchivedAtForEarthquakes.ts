import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArchivedAtForEarthquakes1639928360281 implements MigrationInterface {
  name = "AddArchivedAtForEarthquakes1639928360281";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "earthquakes" ADD "archived_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "earthquakes" DROP COLUMN "archived_at"`);
  }
}
