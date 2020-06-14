import { EntityRepository } from "@tsed/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./../entities/Employee";

@EntityRepository(Employee)
export default class EmployeesRepository extends Repository<Employee> {
  findById(id: string) {
    return this.findOne({id});
  }
}
