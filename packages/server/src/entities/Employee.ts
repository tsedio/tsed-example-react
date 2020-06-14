import {Property} from "@tsed/common";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "employees"})
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Property()
  @Column()
  name: string;

  @Property()
  @Column()
  designation: string;

  @Property()
  @Column()
  salary: number;

  constructor({id, name, designation, salary}: any = {}) {
    this.id = id;
    this.name = name;
    this.designation = designation;
    this.salary = salary;
  }
}
