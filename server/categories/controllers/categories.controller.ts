import express from "express";
import debug from "debug";
import categoriesService from "../services/categories.service";

const log: debug.IDebugger = debug("app:categories-controller");

class CategoriesController {
  async listCategories(req: express.Request, res: express.Response) {
    const categories = await categoriesService.getWithQuery(100, 0);
    res.status(200).send(categories);
  }

  async createCategory(req: express.Request, res: express.Response) {
    const category = await categoriesService.add(req.body);
    res.status(201).send(category);
  }

  async updateCategory(req: express.Request, res: express.Response) {
    log(await categoriesService.update(req.params.categoryId, req.body));
    res.status(204).send();
  }
}

export default new CategoriesController();
