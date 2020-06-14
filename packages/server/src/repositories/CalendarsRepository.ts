import {EntityRepository} from "@tsed/typeorm";
import {Repository} from "typeorm";
import {Calendar} from "../entities/Calendar";

@EntityRepository(Calendar)
export default class CalendarsRepository extends Repository<Calendar> {
  findById(id: string) {
    return this.findOne({id});
  }
}
