import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import categoriesController from "./controllers/categories.controller";

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes");
  }

  configureRoutes() {
    this.app.route("/categories").get(categoriesController.listCategories);
    this.app.route("/category").post(categoriesController.createCategory);
    this.app
      .route(`/category/:categoryId`)
      .get(categoriesController.getById)
      .put(categoriesController.updateCategory);

    return this.app;
  }
}
