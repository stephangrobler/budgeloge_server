import debug from "debug";
import { CRUD } from "../../common/interfaces/crud.interface";
import mongooseService from "../../common/services/mongoose.service";
const log: debug.IDebugger = debug("app:categories-service");

class CategoryService implements CRUD {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema({
    name: String,
    amount: Number,
    budget_id: String,
    hidden: Boolean,
    deleted: Boolean,
    date: Date,
  });

  Category = mongooseService
    .getMongoose()
    .model("categories", this.categorySchema);

  async listAccounts(limit = 25, page = 0) {
    return this.Category.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getByKey(value: any, key: string = "_id") {
    return this.Category.findOne({ [key]: value }).exec();
  }

  async add(categoryFields: any) {
    const category = new this.Category({
      ...categoryFields,
    });
    await category.save((err, result) => {
      if (err) throw err;
      log(result);
    });
    return;
  }

  async update(key: string, resource: any) {
    log(key, resource);
    const existingAccount = await this.Category.findOneAndUpdate(
      { _id: key },
      { $set: resource },
      { new: true }
    ).exec();
    return existingAccount;
  }
  getWithQuery(limit: number, page: number) {
    return this.Category.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  delete(key: string) {
    return this.Category.deleteOne({ _id: key }).exec();
  }
  patch(key: string, resource: any) {
    return this.update(key, resource);
  }
}

export default new CategoryService();
