import {Controller, Get, Inject, MergeParams} from "@tsed/common";
import {ReturnsArray} from "@tsed/swagger";
import {Employee} from "../../entities/Employee";
import EmployeesRepository from "../../repositories/EmployeesRepository";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 */
@Controller({
  path: "/employees",
  children: []
})
@MergeParams(true)
export default class EmployeesCtrl {
  @Inject()
  repository: EmployeesRepository;

  @Get("/")
  @ReturnsArray(Employee)
  async getAllEmployees() {
    return this.repository.find();
  }
}
