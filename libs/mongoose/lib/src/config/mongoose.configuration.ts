export type MongooseConfiguration = typeof mongooseConfiguration;

export const mongooseConfiguration = {
  uri: process.env.DB_URI ||
    "mongodb://root:example@localhost:27017/boplats?authSource=admin",
};
