import { Migration } from '@mikro-orm/migrations';

export class Migration20250901204123 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "email" varchar(255) not null, "secret" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "cards" ("id" uuid not null, "full_name" varchar(255) not null, "title" varchar(255) not null, "email" varchar(255) not null, "social_media" varchar(255) not null, "phone_number" varchar(255) null, "description" varchar(255) null, "user_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "cards_pkey" primary key ("id"));`);
    this.addSql(`alter table "cards" add constraint "cards_user_id_unique" unique ("user_id");`);

    this.addSql(`alter table "cards" add constraint "cards_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "cards" drop constraint "cards_user_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "cards" cascade;`);
  }

}
