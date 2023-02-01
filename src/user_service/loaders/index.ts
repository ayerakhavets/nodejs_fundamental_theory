import { initModel } from '../models/users';
import expressLoader from './express';
import postgresLoader from './postgres';

export default async ({ expressApp }) => {
  const postgressConnection = await postgresLoader();
  initModel(postgressConnection);

  await expressLoader({ app: expressApp });
  console.log('✌️ Express loaded');
}
