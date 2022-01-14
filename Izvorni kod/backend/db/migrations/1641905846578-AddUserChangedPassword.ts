import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserChangedPassword1641905846578 implements MigrationInterface {
    name = 'AddUserChangedPassword1641905846578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "changedPassword" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "changedPassword"`);
    }

}
