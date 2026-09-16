import { shapeIntoMongooseObjectId } from "../libs/config";
import { MotorcycleStatus } from "../libs/enums/motorcycle.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import {
  Motorcycle,
  MotorcycleInput,
  MotorcycleInquiry,
  MotorcycleUpdateInput,
} from "../libs/types/motorcycle";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
import MotorcycleModel from "../schema/Motorcycle.model";

class MotorcycleService {
  private readonly motorcycleModel;
  public viewService;

  constructor() {
    this.motorcycleModel = MotorcycleModel;
    this.viewService = new ViewService();
  }
  /* SPA */

  public async getMotorcycles(inquiry: MotorcycleInquiry): Promise<Motorcycle[]> {
    const match: T = { motorcycleStatus: MotorcycleStatus.PROCESS };
    if (inquiry.motorcycleCollection)
      match.motorcycleCollection = inquiry.motorcycleCollection;
    if (inquiry.search) {
      match.motorcycleName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "motorcyclePrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.motorcycleModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getMotorcycle(
    memberId: ObjectId | null,
    id: string,
  ): Promise<Motorcycle> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.motorcycleModel
      .findOne({ _id: productId, productStatus: MotorcycleStatus.PROCESS })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      // check view log existance
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistance(input);

      console.log("exist:", !!existView);
      if (!existView) {
        // insert new view log
        console.log("Planning to insert new view!");
        await this.viewService.insertMemberView(input);

        // increase target viewf
        result = await this.motorcycleModel
          .findByIdAndUpdate(
            productId,
            { $inc: { motorcycleViews: +1 } },
            { new: true },
          )
          .exec();
      }
    }
    return result;
  }

  /* SSR */

  public async getAllMotorcycles(): Promise<Motorcycle[]> {
    const result = await this.motorcycleModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async createNewMotorcycle(input: MotorcycleInput): Promise<Motorcycle> {
    try {
      return await this.motorcycleModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewMotorcycle:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenMotorcycle(
    id: string,
    input: MotorcycleUpdateInput,
  ): Promise<Motorcycle> {
    // string => ObjectId
    id = shapeIntoMongooseObjectId(id);
    const result = await this.motorcycleModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default MotorcycleService;
