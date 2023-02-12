import expressLoader from './express';
import postgresLoader from './postgres';

export default async ({ expressApp }) => {
  await postgresLoader();
  expressLoader({ app: expressApp });
};
