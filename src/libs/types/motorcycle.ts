import { ObjectId } from "mongoose";
import {
  MotorcycleCollection,
  MotorcycleSize,
  MotorcycleStatus,
} from "../enums/motorcycle.enum";

export interface Motorcycle {
  _id: ObjectId;
  motorcycleStatus: MotorcycleStatus;
  motorcycleCollection: MotorcycleCollection;
  motorcycleName: string;
  motorcyclePrice: number;
  motorcycleLeftCount: number;
  motorcycleSize: MotorcycleSize;
  motorcycleVolume: string;
  motorcycleDesc?: string;
  motorcycleImages: string[];
  motorcycleViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MotorcycleInquiry {
  order: string;
  page: number;
  limit: number;
  motorcycleCollection?: MotorcycleCollection;
  search?: string;
}

export interface MotorcycleInput {
  motorcycleStatus?: MotorcycleStatus;
  motorcycleCollection: MotorcycleCollection;
  motorcycleName: string;
  motorcyclePrice: number;
  motorcycleLeftCount: number;
  motorcycleSize?: MotorcycleSize;
  motorcycleVolume?: string;
  motorcycleDesc?: string;
  motorcycleImages?: string[];
  motorcycleViews?: number;
}

export interface MotorcycleUpdateInput {
  _id: ObjectId;
  motorcycleStatus?: MotorcycleStatus;
  motorcycleCollection?: MotorcycleCollection;
  motorcycleName?: string;
  motorcyclePrice?: number;
  motorcycleLeftCount?: number;
  motorcycleSize?: MotorcycleSize;
  motorcycleVolume?: string;
  motorcycleDesc?: string;
  motorcycleImages?: string[];
  motorcycleViews?: number;
}
