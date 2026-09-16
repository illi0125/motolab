import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import MotorcycleService from "../models/Motorcycle.service";
import { MotorcycleInput, MotorcycleInquiry } from "../libs/types/motorcycle";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { MotorcycleCollection } from "../libs/enums/motorcycle.enum";

const motorcycleService = new MotorcycleService();

const motorcycleController: T = {};
/* SPA */

motorcycleController.getMotorcycles = async (req: Request, res: Response) => {
  try {
    console.log("getMotorcycles");
    const { page, limit, order, motorcycleCollection, search } = req.query;
    const inquiry: MotorcycleInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (motorcycleCollection) {
      inquiry.motorcycleCollection = motorcycleCollection as MotorcycleCollection;
    }
    if (search) inquiry.search = String(search);

    const result = await motorcycleService.getMotorcycles(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMotorcycles:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

motorcycleController.getMotorcycle = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    console.log("getMotorcycle");
    const { id } = req.params;
    // console.log("req.member:", req.member);
    const memberId = req.member?._id ?? null,
      result = await motorcycleService.getMotorcycle(memberId, id as string);
    // console.log("result:", result);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMotorcycle:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/* SSR */

motorcycleController.getAllMotorcycles = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log("getAllMotorcycles");
    const data = await motorcycleService.getAllMotorcycles();
    // console.log("data:", data);
    res.render("motorcycles", { motorcycles: data });
  } catch (err) {
    console.log("Error, getAllMotorcycles:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

motorcycleController.createNewMotorcycle = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewMotorcycle");
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const data: MotorcycleInput = req.body;
    data.motorcycleImages = req.files.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await motorcycleService.createNewMotorcycle(data);
    res.send(
      `<script> alert("Successful Creation!"); window.location.replace('/admin/motorcycle/all') </script>`,
    );
  } catch (err) {
    console.log("Error, createNewMotorcycle:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/motorcycle/all') </script>`,
    );
  }
};

motorcycleController.updateChosenMotorcycle = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log("updateChosenMotorcycle");
    const id = req.params.id;

    const result = await motorcycleService.updateChosenMotorcycle(
      id as string,
      req.body,
    );

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenMotorcycle:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default motorcycleController;
