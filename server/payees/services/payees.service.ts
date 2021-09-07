import debug from "debug";
import { CRUD } from "../../common/interfaces/crud.interface";
import mongooseService from "../../common/services/mongoose.service";
const log: debug.IDebugger = debug("app:payees-service");

class PayeeService implements CRUD {
  Schema = mongooseService.getMongoose().Schema;

  payeeSchema = new this.Schema({
    name: String,
    balance: Number,
    budget_id: String,
  });

  Payee = mongooseService.getMongoose().model("payees", this.payeeSchema);

  async listAccounts(limit = 25, page = 0) {
    return this.Payee.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getByKey(value: any, key: string = "_id") {
    return this.Payee.findOne({ [key]: value }).exec();
  }

  async add(accountFields: any) {
    const account = new this.Payee({
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
    const existingAccount = await this.Payee.findOneAndUpdate(
      { _id: key },
      { $set: resource },
      { new: true }
    ).exec();
    return existingAccount;
  }
  getWithQuery(limit: number, page: number) {
    return this.Payee.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  delete(key: string) {
    return this.Payee.deleteOne({ _id: key }).exec();
  }
  patch(key: string, resource: any) {
    return this.update(key, resource);
  }
}

export default new PayeeService();
