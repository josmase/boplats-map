export type MongooseConfiguration = typeof mongooseConfiguration;

export const mongooseConfiguration = {
  uri: Deno.env.get("DB_URI") ||
    "mongodb://root:example@localhost:27017/boplats?authSource=admin",
};
