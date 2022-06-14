const MainModel = require("./MainModel");
const _ = require("lodash");

const BOOTHACTIVITIES = "boothActivities";

class RsvpModel extends MainModel {
  constructor() {
    super();
  }

  async getBoothActivities() {
    const result = await this.db
      .collection(BOOTHACTIVITIES)
      .where("status", "==", 1)
      .orderBy("createdDate", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return this.toArray(result);
  }

  async add(userBooth) {
    const result = await this.db
      .collection(BOOTHACTIVITIES)
      .add(userBooth)
      .catch((firestoreError) => {
        throw firestoreError;
      });

    return result.id;
  }

  async updateStatus(id, status) {
    try {
      const result = await this.db
        .collection(BOOTHACTIVITIES)
        .doc(id)
        .update({
          status: status,
          updatedAt: new Date()
        })
        .catch((firestoreError) => {
          throw firestoreError;
        });

      return result;
    } catch (error) {
      throw console.error();
    }
  }

  async getByUserId(userId) {
    const result = await this.db
      .collection(BOOTHACTIVITIES)
      .where("userId", "==", userId)
      .orderBy("createdDate", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    const boothActivities = this.toArray(result);

    return boothActivities;
  }

  async getByBoothNum(boothNum) {
    const result = await this.db
      .collection(BOOTHACTIVITIES)
      .where("boothNum", "==", boothNum)
      .orderBy("createdDate", "asc")
      .get()
      .catch((firestoreError) => {
        throw firestoreError;
      });

    const boothActivities = this.toArray(result);

    return boothActivities;
  }
}

module.exports = RsvpModel;
