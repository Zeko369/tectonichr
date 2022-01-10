import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSurveyResponses1641654622511 implements MigrationInterface {
    name = 'AddSurveyResponses1641654622511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey_responses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "questionId" character varying NOT NULL, "optionId" character varying NOT NULL, "surveyId" integer, CONSTRAINT "PK_349995c51959d139d8e485a58ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "earthquakes" DROP COLUMN "archivedAt"`);
        await queryRunner.query(`ALTER TABLE "survey_responses" ADD CONSTRAINT "FK_ce01227f38da9eedae96f1f4c06" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_responses" DROP CONSTRAINT "FK_ce01227f38da9eedae96f1f4c06"`);
        await queryRunner.query(`ALTER TABLE "earthquakes" ADD "archivedAt" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "survey_responses"`);
    }

}
