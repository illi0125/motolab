import mongoose, { Schema } from "mongoose";
import {
  MotorcycleCollection,
  MotorcycleSize,
  MotorcycleStatus,
  MotorcycleVolume,
} from "../libs/enums/motorcycle.enum";

const motorcycleSchema = new Schema(
  {
    motorcycleStatus: {
      type: String,
      enum: MotorcycleStatus,
      default: MotorcycleStatus.PAUSE,
    },

    motorcycleCollection: {
      type: String,
      enum: MotorcycleCollection,
      required: true,
    },

    motorcycleName: {
      type: String,
      required: true,
    },

    motorcyclePrice: {
      type: Number,
      required: true,
    },

    motorcycleLeftCount: {
      type: Number,
      required: true,
    },

    motorcycleSize: {
      type: String,
      enum: MotorcycleSize,
      default: MotorcycleSize.NORMAL,
    },

    motorcycleVolume: {
      type: String,
      enum: MotorcycleVolume,
      default: MotorcycleVolume.LIGHT,
    },

    motorcycleDesc: {
      type: String,
    },

    motorcycleImages: {
      type: [String],
      required: [],
    },

    motorcycleViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // createdAt, updatedAt
);

motorcycleSchema.index(
  { motorcycleName: 1, motorcycleSize: 1, motorcycleVolume: 1 },
  { unique: true },
);
export default mongoose.model("Motorcycle", motorcycleSchema);
