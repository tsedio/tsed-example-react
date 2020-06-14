import {Inject, Injectable} from "@tsed/common";
import {Calendar} from "../../entities/Calendar";
import {Employee} from "../../entities/Employee";
import CalendarsRepository from "../../repositories/CalendarsRepository";
import EmployeesRepository from "../../repositories/EmployeesRepository";

@Injectable()
export class CalendarsService {
  @Inject()
  calendarsRepository: CalendarsRepository;

  @Inject()
  employeesRepository: EmployeesRepository;

  async $beforeRoutesInit() {
    const employee = await this.getEmployee();
    const hasCalendar = await this.hasCalendars();

    if (!hasCalendar) {
      (await import("../../../resources/calendars.json"))
        .map((rawCalendar) => {
          const calendar = new Calendar(rawCalendar);
          calendar.owner = employee.id;

          return this.calendarsRepository.save(calendar);
        });
    }
  }

  async getEmployee() {
    let employee = await this.employeesRepository.findById("1");

    if (!employee) {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        designation: "Owner",
        salary: 3000
      });

      await this.employeesRepository.save(employee);
    }

    return employee;
  }

  private async hasCalendars() {
    return (await this.calendarsRepository.find()).length;
  }
}
