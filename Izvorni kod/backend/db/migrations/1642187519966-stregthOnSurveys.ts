import {MigrationInterface, QueryRunner} from "typeorm";

export class stregthOnSurveys1642187519966 implements MigrationInterface {
    name = 'stregthOnSurveys1642187519966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys" ADD "strength" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys" DROP COLUMN "strength"`);
    }

}
