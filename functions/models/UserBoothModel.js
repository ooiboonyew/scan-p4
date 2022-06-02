const MainModel = require("./MainModel");
const _ = require("lodash");

const USERBOOTHS = "userBooths";

class RsvpModel extends MainModel {
  constructor() {
    super();
  }

  async getUserBooths() {
    const result = await this.db
      .collection(USERBOOTHS)
      .orderBy("createdDate", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async add(userBooth) {
    const result = await this.db
      .collection(USERBOOTHS)
      .add(userBooth)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(USERBOOTHS)
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
      .collection(USERBOOTHS)
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

module.exports = RsvpModel;
