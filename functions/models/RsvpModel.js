const MainModel = require('./MainModel')
const _ = require('lodash');

const RSVP = 'rsvp';

class RsvpModel extends MainModel {
  constructor() {
    super()
  }

  async getRSVP() {
    const result = await this.db.collection(RSVP)
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async update(Id, data) {
    try {
      const result = await this.db.collection(RSVP)
        .doc(Id)
        .update(data)
        .catch((firestoreError) => {
          throw firestoreError
        })

      return result
    } catch (error) {
      throw console.error();
    }
  }

  async getSettingById(settingId) {
    const setting = await this.db.collection(RSVP)
      .doc(settingId)
      .get()
      .catch((firestoreError) => {
        throw firestoreError
      })

    if (!setting.exists) {
      const error = new Error('Setting does not exist')
      error.status = 404
      throw error
    }

    const settingData = setting.data()
    return { settingId, ...settingData }
  }

}

module.exports = RsvpModel;
