import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BaseModel extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt: Date;

  @Field(() => Float)
  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;
}
