import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1710000000000 implements MigrationInterface {
  name = 'InitialSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "divisions" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL UNIQUE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    
    await queryRunner.query(`
      CREATE TABLE "sections" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "divisionId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_division_section" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "employees" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "employeeId" character varying(50) NOT NULL UNIQUE,
        "firstName" character varying(100) NOT NULL,
        "lastName" character varying(100) NOT NULL,
        "email" character varying(150) NOT NULL UNIQUE,
        "role" character varying(50) NOT NULL,
        "position" character varying(100) NOT NULL,
        "amCode" character varying(50),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "divisions"`);
  }
}