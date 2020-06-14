import {EntityRepository} from "@tsed/typeorm";
import {Repository} from "typeorm";
import {Event} from "./../entities/Event";

@EntityRepository(Event)
export default class EventsRepository extends Repository<Event> {
  findById(id: string) {
    return this.findOne({id});
  }
}
