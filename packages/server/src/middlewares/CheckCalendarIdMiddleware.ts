import {Context, Inject, Middleware, PathParams, Required} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import CalendarsRepository from "../repositories/CalendarsRepository";

@Middleware()
export class CheckCalendarIdMiddleware {
  @Inject()
  repository: CalendarsRepository;

  async use(@Required() @PathParams("calendarId") calendarId: string,
            @Context() context: Context) {
    const calendar = await this.repository.findById(calendarId);

    if (!calendar) {
      throw new NotFound("Calendar not found");
    }

    context.set("calendar", calendar);
  }
}
