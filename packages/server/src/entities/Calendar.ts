import {Property, Required} from "@tsed/common";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "calendars"})
export class Calendar {
  @Property()
  @PrimaryGeneratedColumn()
  id: string;

  @Required()
  @Column()
  name: string;

  @Property()
  @Column()
  owner: string;

  constructor({id, name, owner}: any = {}) {
    this.id = id;
    this.name = name;
    this.owner = owner;
  }
}
