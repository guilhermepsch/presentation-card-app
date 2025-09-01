import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';

@Entity({ tableName: 'cards' })
export class MikroOrmCardEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property()
  fullName!: string;

  @Property()
  title!: string;

  @Property()
  email!: string;

  @Property()
  socialMedia!: string;

  @Property({ nullable: true })
  phoneNumber!: string | null;

  @Property({ nullable: true })
  description!: string | null;

  @OneToOne(() => MikroOrmUserEntity, { eager: true, unique: true })
  user!: MikroOrmUserEntity;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt!: Date;
}
