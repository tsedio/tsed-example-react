import {Property} from "@tsed/common";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "events"})
export class Event {
  @Property()
  @PrimaryGeneratedColumn()
  id: string;

  @Property()
  @Column()
  calendarId: string;

  @Property()
  @Column()
  startDate: Date;

  @Property()
  @Column()
  endDate: Date;

  @Property()
  @Column()
  name: string;

  constructor({id, calendarId, startDate, endDate, name}: any = {}) {
    this.id = id;
    this.calendarId = calendarId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
  }
}
