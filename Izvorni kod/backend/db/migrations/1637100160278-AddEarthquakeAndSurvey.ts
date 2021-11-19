import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEarthquakeAndSurvey1637100160278 implements MigrationInterface {
  name = "AddEarthquakeAndSurvey1637100160278";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "surveys" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "lat" real NOT NULL, "lng" real NOT NULL, "earthquakeId" integer, CONSTRAINT "PK_1b5e3d4aaeb2321ffa98498c971" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "earthquakes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "strength" real NOT NULL, "epicenter_lat" real NOT NULL, "epicenter_lng" real NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_8a06d6d0352ace49f767fc6feb7" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "surveys" ADD CONSTRAINT "FK_8fa007c72d391855b1ec0e2036f" FOREIGN KEY ("earthquakeId") REFERENCES "earthquakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "surveys" DROP CONSTRAINT "FK_8fa007c72d391855b1ec0e2036f"`);
    await queryRunner.query(`DROP TABLE "earthquakes"`);
    await queryRunner.query(`DROP TABLE "surveys"`);
  }
}
