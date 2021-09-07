import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import PayeeController from "./controllers/payees.controller";

export class PayeeRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PayeeRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/payees`)
      .get(PayeeController.listPayees)
      .post(PayeeController.createPayee);

    this.app
      .route(`/payees/:payeeId`)
      // .get(PayeeController.getPayeeById)
      .put(PayeeController.updatePayee);
    return this.app;
  }
}
