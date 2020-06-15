import { Service, $log } from "@tsed/common";
import EmployeeRepository from "./../../repositories/EmployeeRepository";
import Employee from "../../models/Employee";

@Service()
export class EmployeeService {
  constructor(private readonly empRepo: EmployeeRepository) {}

  /**
   * Return ALl the Employees Stored in the database.
   */
  public async getAll(): Promise<Employee[]> {
    /*const [ allEmployees, noOfEmployess ]  = await this.empRepo.findAndCount({
            where : {}, select : "*",
            take : 100, skip : 0
        });*/

    const allEmployees = await this.empRepo.find();
    const finalSetOfEmployees: Employee[] = [];
    allEmployees.forEach((emp) => {
      const empModel = new Employee();
      empModel.id = emp.id;
      empModel.name = emp.name;
      finalSetOfEmployees.push(empModel);
    });

    return finalSetOfEmployees;
  }
}
