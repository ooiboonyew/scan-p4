const MainModel = require("./MainModel");
const _ = require("lodash");

const BOOTHS = "booths";

class BoothModel extends MainModel {
  constructor() {
    super();
  }

  async getBooths() {
    const result = await this.db
      .collection(BOOTHS)
      .orderBy("boothNum", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async getBoothById(id) {
    try {
      var booth = await this.db.collection(BOOTHS).doc(id).get();
      const boothData = booth.data();
      return { id, ...boothData };
    } catch (err) {
      throw err;
    }
  }

  async getBoothByNum(num) {
    const result = await this.db
      .collection(BOOTHS)
      .where("boothNum", "==", num)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    const boothList = this.toArray(result);

    return boothList;
  }

  async checkBoothEmail(email) {
    try {
      let booth, id;
      await this.db
        .collection(BOOTHS)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            booth = doc.data();
            id = doc.id;
          });
        });

      return { id, ...booth };
    } catch (err) {
      throw err;
    }
  }

  async add(product) {
    const result = await this.db
      .collection(BOOTHS)
      .add(product)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(BOOTHS)
        .doc(data.id)
        .update(data)
        .catch((firestoreError) => {
          throw firestoreError;
        });

      return result;
    } catch (error) {
      throw console.error();
    }
  }

  async getSettingById(settingId) {
    const setting = await this.db
      .collection(BOOTHS)
      .doc(settingId)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    if (!setting.exists) {
      const error = new Error("Setting does not exist");
      error.status = 404;
      throw error;
    }

    const settingData = setting.data();
    return { settingId, ...settingData };
  }
}

module.exports = BoothModel;
