import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import categoriesController from "./controllers/categories.controller";

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes");
  }

  configureRoutes() {
    this.app
      .route("/categories")
      .get(categoriesController.listCategories)
      .post(categoriesController.createCategory);

    this.app
      .route(`/categories/:categoryId`)
      .put(categoriesController.updateCategory);

    return this.app;
  }
}
