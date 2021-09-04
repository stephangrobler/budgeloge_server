import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class TransactionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TransactionRoutes");
  }

  configureRoutes() {
    this.app
      .route("transactions")
      .get((req: express.Request, res: express.Response) => {})
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to transactions`);
      });

    return this.app;
  }
}
