import { inject, TestContext } from "@tsed/testing";
import { expect } from "chai";
import { MemoryStorage } from "../storage/MemoryStorage";
import { EmployeeService } from "./EmployeeService";
import EmployeeRepository from "./../../repositories/EmployeeRepository";
import { TypeORMService } from "@tsed/typeorm";
import { Employee } from "src/entities/Employee";

describe("EmployeeService", () => {
    before(() => TestContext.create());
    before(() => TestContext.reset());

    describe("without IOC", () => {
        it("should do something", () => {

            expect(new EmployeeService(new EmployeeRepository()
            )
            ).to.be.an.instanceof(EmployeeService);
        });
    });

    describe("with inject()", () => {
        it("should get the service from the inject method", inject(
            [EmployeeService],
            (empService: EmployeeService) => {
                expect(empService).to.be.an.instanceof(EmployeeService);
            }
        ));
    });

    describe("via TestContext to mock other service", () => {
        it("should get the service from InjectorService", async () => {
            // GIVEN
            const empService = {
                find: () => [{ "id": 1, "name": "Pankaj Bhatt" }]
            };

            // WHEN
            const employeeService: EmployeeService = await TestContext.invoke(
                EmployeeService,
                [{ provide: EmployeeRepository, use: empService }]
            );

            // THEN
            expect(employeeService).to.be.an.instanceof(EmployeeService);
            // @ts-ignore
            expect(employeeService.empRepo).to.equal(empService);
        });
    });
});
