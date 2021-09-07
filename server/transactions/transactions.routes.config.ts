import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import transactionsController from "./controllers/transactions.controller";

export class TransactionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TransactionRoutes");
  }

  configureRoutes() {
    this.app
      .route("/transactions")
      .get(transactionsController.listTransactions)
      .post(transactionsController.createTransaction);

    this.app
      .route(`/transactions/:transactionId`)
      .put(transactionsController.updateTransaction);

    return this.app;
  }
}
