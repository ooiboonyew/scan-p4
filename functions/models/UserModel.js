const MainModel = require("./MainModel");
const _ = require("lodash");

const USERS = "users";

class UserModel extends MainModel {
  constructor() {
    super();
  }

  async getUsers() {
    const result = await this.db
      .collection(USERS)
      .orderBy("name", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async checkEmail(email) {
    try {
      let rsvp, id;
      await this.db
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            rsvp = doc.data();
            id = doc.id;
          });
        });

      return { id, ...rsvp };
    } catch (err) {
      throw err;
    }
  }

  async checkStaffId(staffId) {
    try {
      let rsvp, id;
      await this.db
        .collection(USERS)
        .where("staffId", "==", staffId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            rsvp = doc.data();
            id = doc.id;
          });
        });

      return { id, ...rsvp };
    } catch (err) {
      throw err;
    }
  }

  async filterNamelUsers(filterText) {
    var strFilter = String(filterText);
    const result = await this.db
      .collection(USERS)
      .where("name", ">=", strFilter.toUpperCase())
      .where("name", "<=", strFilter.toLowerCase() + "\uf8ff")
      .orderBy("name", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async filterEmailUsers(filterText) {
    const result = await this.db
      .collection(USERS)
      .where("email", ">=", filterText)
      .where("email", "<", filterText + "z")
      .orderBy("email", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async filterStaffIdUsers(filterText) {
    const result = await this.db
      .collection(USERS)
      .where("staffId", ">=", filterText)
      .where("staffId", "<", filterText + "z")
      .orderBy("staffId", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  // async filterUsers(filtertType, filterText) {
  //   const result = await this.db
  //     .collection(USERS)
  //     .where(filtertType == "email" ? "email" : "staffId", "==", filterText)
  //     // .orderBy(filtertType == "email" ? "email" : "staffId", "asc")
  //     .get()
  //     .catch((firestoreError) => {
  //       throw firestoreError;
  //     });

  //   return this.toArray(result);
  // }

  async getUserById(id) {
    try {
      var user = await this.db.collection(USERS).doc(id).get();
      const userData = user.data();
      return { id, ...userData };
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email) {
    const result = await this.db
      .collection(USERS)
      .where("email", "==", email)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    const userList = this.toArray(result);

    return userList;
  }

  async checkUserEmail(email) {
    try {
      let user, id;
      await this.db
        .collection(USERS)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            user = doc.data();
            id = doc.id;
          });
        });

      return { id, ...user };
    } catch (err) {
      throw err;
    }
  }

  async add(dat) {
    const result = await this.db
      .collection(USERS)
      .add(dat)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(USERS)
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
      .collection(USERS)
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

module.exports = UserModel;
