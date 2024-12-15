import { mongooseConfiguration } from "./src/config/mongoose.configuration.ts";
import MongooseModule from "./src/mongoose.ts";

export const mongooseModule = new MongooseModule(mongooseConfiguration);
