import express from 'express';
import bodyParser from "body-parser";
import config from '../config';
import routes from "../api";

export default ({ app }: { app: express.Application }) => {
  // Transforms the raw string of req.body into json
  app.use(express.json());
  app.use(bodyParser.urlencoded({extended : true}));

  // Load API routes
  app.use(config.api.prefix, routes());
}
