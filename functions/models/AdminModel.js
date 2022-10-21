const MainModel = require("./MainModel");
const _ = require("lodash");

const ADMIN = "admin";

class AdminModel extends MainModel {
  constructor() {
    super();
  }


  async checkAdmin(email) {
    try {
      let admin, id;
      await this.db
        .collection(ADMIN)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            admin = doc.data();
            id = doc.id;
          });
        });

      return { id, ...admin };
    } catch (err) {
      throw err;
    }
  }

}

module.exports = AdminModel;
