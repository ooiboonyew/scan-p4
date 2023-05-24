const MainModel = require("./MainModel");
const _ = require("lodash");

const RSVP = "rsvp";

class RsvpModel extends MainModel {
  constructor() {
    super();
  }

  async getRSVP() {
    const result = await this.db
      .collection(RSVP)
      .orderBy("createdDate", "asc")
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
        .collection(RSVP)
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

  async getRSVPById(rsvpId) {
    try {
      var rsvp = await this.db.collection(RSVP).doc(rsvpId).get();
      const rsvpData = rsvp.data();
      return { rsvpId, ...rsvpData };
    } catch (err) {
      throw err;
    }
  }

  async getRSVPbyQR(qr) {
    try {
      let rsvp, id;
      await this.db
        .collection(RSVP)
        .where("qr", "==", qr)
        .orderBy("createdDate", "desc")
        .limit(1)
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

  async getRSVPbyLocation(location) {
    try {
      let rsvp, id;
      await this.db
        .collection(RSVP)
        .where("location", "==", location)
        .limit(1)
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

  async getRSVPbylocation(location) {
    const result = await this.db
      .collection(RSVP)
      .where("location", "==", location)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async getRSVPbylocationId(locationId) {
    const result = await this.db
      .collection(RSVP)
      .where("location.id", "==", locationId)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async checkRSVPEmail(email) {
    try {
      let rsvp, id;
      await this.db
        .collection(RSVP)
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

  async checkRSVPMobile(mobile) {
    try {
      let rsvp, id;
      await this.db
        .collection(RSVP)
        .where("mobile", "==", mobile)
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

  async add(product) {
    const result = await this.db
      .collection(RSVP)
      .add(product)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async update(data) {
    try {
      const result = await this.db
        .collection(RSVP)
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
      .collection(RSVP)
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
