import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterationAddAvatarToUser1671560815806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "avatarURL",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatarURL");
    }

}
