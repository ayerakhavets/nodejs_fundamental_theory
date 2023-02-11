import expressLoader from './express';
import postgresLoader from './postgres';

export default async ({ expressApp }) => {
  await postgresLoader();
  await expressLoader({ app: expressApp });
  console.log('✌️ Express loaded');
};
