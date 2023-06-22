const MainModel = require("./MainModel");
const _ = require("lodash");

const Entrance = "entrance";

class RsvpModel extends MainModel {
  constructor() {
    super();
  }

  async getINEntrance() {
    const result = await this.db
      .collection(Entrance)
      .where("entry", "==", "IN")
      .orderBy("createdDate", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async checkEmail(email) {
    try {
      let entrance, id;
      await this.db
        .collection(Entrance)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            entrance = doc.data();
            id = doc.id;
          });
        });

      return { id, ...entrance };
    } catch (err) {
      throw err;
    }
  }

  async getEntranceById(entranceId) {
    try {
      var entrance = await this.db.collection(Entrance).doc(entranceId).get();
      const entranceData = entrance.data();
      return { entranceId, ...entranceData };
    } catch (err) {
      throw err;
    }
  }

  async getEntrancebyQR(qr) {
    try {
      let entrance, id;
      await this.db
        .collection(Entrance)
        .where("qr", "==", qr)
        .orderBy("createdDate", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            entrance = doc.data();
            id = doc.id;
          });
        });

      return { id, ...entrance };
    } catch (err) {
      throw err;
    }
  }

  async getEntrancebyLocation(location) {
    try {
      let entrance, id;
      await this.db
        .collection(Entrance)
        .where("location", "==", location)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            entrance = doc.data();
            id = doc.id;
          });
        });
        
      return { id, ...entrance };
    } catch (err) {
      throw err;
    }
  }

  async getEntrancebylocation(location) {
    const result = await this.db
      .collection(Entrance)
      .where("location", "==", location)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async getEntrancebylocationId(locationId) {
    const result = await this.db
      .collection(Entrance)
      .where("location.id", "==", locationId)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async checkEntranceEmail(email) {
    try {
      let entrance, id;
      await this.db
        .collection(Entrance)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            entrance = doc.data();
            id = doc.id;
          });
        });

      return { id, ...entrance };
    } catch (err) {
      throw err;
    }
  }

  async checkEntranceMobile(mobile) {
    try {
      let entrance, id;
      await this.db
        .collection(Entrance)
        .where("mobile", "==", mobile)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            entrance = doc.data();
            id = doc.id;
          });
        });

      return { id, ...entrance };
    } catch (err) {
      throw err;
    }
  }

  async add(product) {
    const result = await this.db
      .collection(Entrance)
      .add(product)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(Entrance)
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
      .collection(Entrance)
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
