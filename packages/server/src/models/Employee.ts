import { Property, Required } from "@tsed/common";

export default class Employee {
  @Property()
  id: number;

  @Required()
  name: string;

  @Property()
  salary: number;
}
