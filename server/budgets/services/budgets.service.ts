import debug from "debug";
import mongooseService from "../../common/services/mongoose.service";

const log: debug.IDebugger = debug("app:budgets-service");

class BudgetService {
  Schema = mongooseService.getMongoose().Schema;
  budgetSchema = new this.Schema({
    name: String,
    balance: Number,
  });

  Budget = mongooseService.getMongoose().model("budgets", this.budgetSchema);

  async list(limit: number = 25, page: number = 0) {
    return this.Budget.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async add(budgetFields: any) {
    const budget = new this.Budget({
      ...budgetFields,
    });
    await budget.save((err, result) => {
      if (err) throw err;
      log(result);
    });
    return;
  }

  async getByKey(value: any, key: string = "_id") {
    return this.Budget.findOne({ [key]: value })
    .exec();
  }
}

export default new BudgetService();
