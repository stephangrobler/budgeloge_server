import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import PayeeController from "./controllers/payees.controller";

export class PayeeRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PayeeRoutes");
  }

  configureRoutes() {
    this.app.route(`/payees`).get(PayeeController.listPayees);
    this.app.post(`/payee`, PayeeController.createPayee);

    this.app
      .route(`/payee/:payeeId`)
      // .get(PayeeController.getPayeeById)
      .put(PayeeController.updatePayee);
    return this.app;
  }
}
