import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCity1642187728139 implements MigrationInterface {
    name = 'AddCity1642187728139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys" ADD "city" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys" DROP COLUMN "city"`);
    }

}
