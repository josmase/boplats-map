import mongoose from 'mongoose';

export interface ConnectionConfiguration {
  uri: string;
  username: string;
  password: string;
}

export async function connectToDatabase({
  uri,
  username,
  password,
}: ConnectionConfiguration) {
  const censoredPassword = '*'.repeat(password.length);
  console.info(
    `Connecting to database. user: ${username}, password: ${censoredPassword}, uri: ${uri}`
  );

  await mongoose.connect(uri, {
    user: username,
    pass: password,
    autoIndex: true,
    autoCreate: true,
  });
  console.log('Connected to MongoDB');
}
