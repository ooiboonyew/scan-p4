const MainModel = require("./MainModel");
const _ = require("lodash");

const SETTINGS = "settings";

class UserModel extends MainModel {
  constructor() {
    super();
  }

  async getById(id) {
    try {
      var user = await this.db.collection(SETTINGS).doc(id).get();
      const userData = user.data();
      return { id, ...userData };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserModel;
