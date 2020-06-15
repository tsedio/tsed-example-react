import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "@tsed/common";

@Entity({ name: "employees" })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Property()
  @Column()
  name: string;

  @Property()
  @Column()
  designation: string;

  @Property()
  @Column()
  salary: number;
}
