import {PlatformTest} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {expect} from "chai";
import * as Sinon from "sinon";
import CalendarsRepository from "../../repositories/CalendarsRepository";
import {CalendarsCtrl} from "./CalendarsCtrl";

describe("CalendarCtrl", () => {
  describe("get()", () => {
    describe("via PlatformTest to mock other service", () => {
      before(() => PlatformTest.create());
      after(() => PlatformTest.reset());

      it("should return a result from mocked service", async () => {
        // GIVEN
        const calendarsService = {
          findOne: Sinon.stub().resolves({id: "1"})
        };

        const calendarsCtrl = await PlatformTest.invoke(CalendarsCtrl, [
          {
            token: CalendarsRepository,
            use: calendarsService
          }
        ]);

        // WHEN
        const result = await calendarsCtrl.get("1");

        // THEN
        result.should.deep.equal({id: "1"});
        calendarsService.find.should.be.calledWithExactly("1");

        calendarsCtrl.should.be.an.instanceof(CalendarsCtrl);
        calendarsCtrl.calendarsService.should.deep.equal(calendarsService);
      });
    });

    describe("when calendar isn't found", () => {
      before(() => PlatformTest.create());
      after(() => PlatformTest.reset());

      it("should throw error", async () => {
        // GIVEN
        const calendarsService = {
          find: Sinon.stub().resolves()
        };

        const calendarsCtrl: CalendarsCtrl = await PlatformTest.invoke(
          CalendarsCtrl,
          [
            {
              token: CalendarsService,
              use: calendarsService
            }
          ]
        );

        // WHEN
        let actualError;
        try {
          await calendarsCtrl.get("1");
        } catch (er) {
          actualError = er;
        }
        // THEN
        // @ts-ignore
        calendarsCtrl.calendarsService.should.deep.eq(calendarsService);
        calendarsService.find.should.be.calledWithExactly("1");
        actualError.should.instanceOf(NotFound);
        actualError.message.should.eq("Calendar not found");
      });
    });
  });

  describe("save()", () => {
    before(() => PlatformTest.create());
    after(() => PlatformTest.reset());

    it("should return saved data", async () => {
      // GIVEN
      const calendar = new Calendar();
      calendar.id = "id";
      calendar.name = "name";
      calendar.owner = "owner";

      const calendarsService = {
        create: Sinon.stub().resolves(calendar)
      };

      const calendarsCtrl: CalendarsCtrl = await PlatformTest.invoke(
        CalendarsCtrl,
        [
          {
            token: CalendarsService,
            use: calendarsService
          }
        ]
      );

      // WHEN
      const result = await calendarsCtrl.save({name: "name"});

      // THEN
      calendarsService.create.should.be.calledWithExactly({name: "name"});
      result.should.deep.eq(calendar);
    });
  });
  describe("update()", () => {
    before(() => PlatformTest.create());
    after(() => PlatformTest.reset());

    it("should return update data", async () => {
      // GIVEN
      const calendar = new Calendar();
      calendar.id = "id";
      calendar.name = "name";
      calendar.owner = "owner";

      const calendarsService = {
        update: Sinon.stub().resolves(calendar)
      };

      const calendarsCtrl: CalendarsCtrl = await PlatformTest.invoke(
        CalendarsCtrl,
        [
          {
            token: CalendarsService,
            use: calendarsService
          }
        ]
      );

      // WHEN
      const result = await calendarsCtrl.update("id", {name: "name"});

      // THEN
      calendarsService.update.should.be.calledWithExactly({
        id: "id",
        name: "name"
      });
      result.should.deep.eq(calendar);
    });
  });
  describe("remove()", () => {
    before(() => PlatformTest.create());
    after(() => PlatformTest.reset());

    it("should return update data", async () => {
      // GIVEN
      const calendarsService = {
        remove: Sinon.stub().resolves()
      };

      const calendarsCtrl: CalendarsCtrl = await PlatformTest.invoke(
        CalendarsCtrl,
        [
          {
            token: CalendarsService,
            use: calendarsService
          }
        ]
      );

      // WHEN
      const result = await calendarsCtrl.remove("id");

      // THEN
      calendarsService.remove.should.be.calledWithExactly("id");
      expect(result).to.eq(undefined);
    });
  });
});
