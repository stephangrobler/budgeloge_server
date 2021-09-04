import express from "express";
import mongooseService from "../../common/services/mongoose.service";
import BudgetService from "../services/budgets.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:budgets-controller");

class BudgetsController {
  async listBudgets(req: express.Request, res: express.Response) {
    const budgets = await BudgetService.list(100, 0);
    res.status(200).send(budgets);
  }

  async createBudget(req: express.Request, res: express.Response) {
    const body = req.body;
    log(body);
    const budget = await BudgetService.add(body);

    res.status(201).send(budget);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const budget = await BudgetService.getByKey(req.params.budgetId);
    res.status(200).send(budget);
  }
}

export default new BudgetsController();
