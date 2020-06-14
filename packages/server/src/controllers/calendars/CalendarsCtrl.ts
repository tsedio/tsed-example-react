import {
  BodyParams,
  Context,
  Controller,
  Delete,
  Get,
  Inject,
  PathParams,
  Post,
  Put,
  Required,
  Status,
  UseBefore
} from "@tsed/common";
import {BadRequest, NotFound} from "@tsed/exceptions";
import {Description, Returns, ReturnsArray} from "@tsed/swagger";
import {Calendar} from "../../entities/Calendar";
import {CheckCalendarIdMiddleware} from "../../middlewares/CheckCalendarIdMiddleware";
import CalendarsRepository from "../../repositories/CalendarsRepository";
import {EventsCtrl} from "../events/EventsCtrl";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 * In this case, EventsCtrl is a dependency of CalendarsCtrl.
 * All routes of EventsCtrl will be mounted on the `/calendars` path.
 */
@Controller({
  path: "/calendars",
  children: [EventsCtrl]
})
export class CalendarsCtrl {
  @Inject()
  repository: CalendarsRepository;

  @Get("/:id")
  @Returns(Calendar)
  @Description("Return a calendar from his given id")
  async get(@Required() @PathParams("id") id: string): Promise<Calendar> {
    const calendar = await this.repository.findOne({id});

    if (calendar) {
      return calendar;
    }

    throw new NotFound("Calendar not found");
  }

  @Put("/")
  @Status(201)
  @Returns(Calendar)
  save(@BodyParams() calendar: Calendar): Promise<Calendar> {
    return this.repository.save(calendar);
  }

  @Post("/:id")
  @Returns(Calendar)
  async update(
    @PathParams("id") @Required() id: string,
    @BodyParams() @Required() calendar: Calendar
  ): Promise<Calendar> {
    if (id !== calendar.id) {
      throw new BadRequest("Resource ID mismatch with payload");
    }

    return this.repository.save(calendar);
  }

  @Delete("/")
  @Status(204)
  @UseBefore(CheckCalendarIdMiddleware)
  async remove(@BodyParams("id") @Required() id: string,
               @Context() context: Context): Promise<void> {

    const calendar: Calendar = context.get("calendar");

    if (!calendar) {
      throw new NotFound("Calendar id not found");
    }

    await this.repository.remove(calendar);
  }

  @Get("/")
  @ReturnsArray(Calendar)
  async getAllCalendars(): Promise<Calendar[]> {
    return this.repository.find();
  }
}
