const MainModel = require("./MainModel");
const _ = require("lodash");

const Config = "config";

class RsvpModel extends MainModel {
  constructor() {
    super();
  }

  async getConfig() {
    const result = await this.db
      .collection(Config)
      .orderBy("location", "asc")
      // .orderBy("sublocation", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async getConfigById(configId) {
    try {
      var config = await this.db.collection(Config).doc(configId).get();
      const configData = config.data();
      return { configId, ...configData };
    } catch (err) {
      throw err;
    }
  }

  async add(config) {
    const result = await this.db
      .collection(Config)
      .add(config)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(Config)
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

  async delete(id) {
    try {
      const result = await this.db
        .collection(Config)
        .doc(id)
        .delete()
        .catch((firestoreError) => {
          throw firestoreError;
        });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RsvpModel;
