import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import accountsController from "./controllers/accounts.controller";

export class AccountRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AccountRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/accounts`)
      .get(accountsController.listAccounts)
      .post(accountsController.createAccount);

    this.app
      .route(`/accounts/:accountId`)
      .put(accountsController.updateAccount);
    return this.app;
  }
}
