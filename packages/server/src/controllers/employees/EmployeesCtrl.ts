import { Controller, Get, MergeParams } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";

import Employee from "../../models/Employee";

import { EmployeeService } from "../../services/storage/EmployeeService";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 */
@Controller({
  path: "/employees",
  children: [],
})
export default class EmployeesCtrl {
  constructor(private empService: EmployeeService) {}

  @Get("/")
  @ReturnsArray(Employee)
  async getAllEmployees() {
    return this.empService.getAll();
  }
}
