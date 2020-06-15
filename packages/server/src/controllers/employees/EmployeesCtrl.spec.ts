import { TestContext } from "@tsed/testing";
import { expect } from "chai";
import * as Sinon from "sinon";
import { EmployeeService } from "../../services/storage/EmployeeService";
import EmployeesCtrl from "./EmployeesCtrl";
import EmployeeRepository from "../../repositories/EmployeeRepository";


describe("EmployeesCtrl", () => {
    describe("getAllEmployees()", () => {
        describe("without IOC", () => {
            it("should do something", () => {
                const employeesCtrl = new EmployeesCtrl(
                    new EmployeeService(new EmployeeRepository())
                );
                employeesCtrl.should.an.instanceof(EmployeesCtrl);
            });
        });

        describe("via TestContext to mock other service", () => {
            before(() => TestContext.create());
            after(() => TestContext.reset());

            it("should return a single result from mocked service", async () => {
                // GIVEN


                const employeeService = {
                    getAll: Sinon.stub().resolves([{ id: "1", "name": "Pankaj Bhatt" }]),
                };

                const employeesCtrl = await TestContext.invoke(EmployeesCtrl, [
                    {
                        provide: EmployeeService,
                        use: employeeService,
                    },
                ]);

                // WHEN
                const result = await employeesCtrl.getAllEmployees();

                // THEN
                result.should.deep.equal([{ id: "1", "name": "Pankaj Bhatt" }]);

                employeesCtrl.should.be.an.instanceof(EmployeesCtrl);
                employeesCtrl.empService.should.deep.equal(employeeService);
            });
        });



    });

});
