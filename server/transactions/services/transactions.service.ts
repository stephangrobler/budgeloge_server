import debug from "debug";
import { CRUD } from "../../common/interfaces/crud.interface";
import mongooseService from "../../common/services/mongoose.service";
const log: debug.IDebugger = debug("app:transactions-service");

class TransactionService implements CRUD {
  Schema = mongooseService.getMongoose().Schema;

  transactionSchema = new this.Schema({
    name: String,
    amount: Number,
    budget_id: String,
    payee_id: String,
    account_id: String,
    category_id: String,
    reconciled: Boolean,
    hidden: Boolean,
    deleted: Boolean,
    date: Date,
  });

  Transaction = mongooseService
    .getMongoose()
    .model("transactions", this.transactionSchema);

  async listAccounts(limit = 25, page = 0) {
    return this.Transaction.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getByKey(value: any, key: string = "_id") {
    return this.Transaction.findOne({ [key]: value }).exec();
  }

  async add(accountFields: any) {
    const account = new this.Transaction({
      ...accountFields,
    });
    await account.save((err, result) => {
      if (err) throw err;
      log(result);
    });
    return;
  }

  async update(key: string, resource: any) {
    log(key, resource);
    const existingAccount = await this.Transaction.findOneAndUpdate(
      { _id: key },
      { $set: resource },
      { new: true }
    ).exec();
    return existingAccount;
  }
  getWithQuery(limit: number, page: number) {
    return this.Transaction.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  delete(key: string) {
    return this.Transaction.deleteOne({ _id: key }).exec();
  }
  patch(key: string, resource: any) {
    return this.update(key, resource);
  }
}

export default new TransactionService();
