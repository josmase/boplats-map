import mongoose from "mongoose";
import type { MongooseConfiguration } from "./config/mongoose.configuration.ts";

export default class MongooseModule {
  constructor(private readonly mongooseConfiguration: MongooseConfiguration) {
  }

  async connect() {
    console.info(
      "Connecting to MongoDB using URI:",
      this.maskCredentials(this.mongooseConfiguration.uri),
    );

    await mongoose.connect(this.mongooseConfiguration.uri);
  }

  private maskCredentials(connectionString: string) {
    const maskedConnectionString = connectionString.replace(
      /(mongodb:\/\/)(.*?):(.*?)@/,
      "$1****:****@",
    );
    return maskedConnectionString === connectionString
      ? "****"
      : maskedConnectionString;
  }

  getConnection() {
    return mongoose.connection;
  }
}
