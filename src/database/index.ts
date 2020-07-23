import mongoose from "mongoose";
import { getEnvValue } from "../helpers/env";
import constants from "../constants";
import { EnvVarTypeEnum } from "../enums/EnvVarTypeEnum";

export const connect = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(<string>getEnvValue(EnvVarTypeEnum.MongodbUri), { useNewUrlParser: true, useUnifiedTopology: true });
    console.info('Database Connected');
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
