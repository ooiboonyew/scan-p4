const makeDb = require('./db');

class MainModel {
  constructor() {
    this.db = makeDb();
  }

  toArray(docs) {
    let collection = [];
    docs.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      collection.push({ id, ...data });
    });

    return collection;
  }

  toObject(obj) {
    if (obj.empty) {
      return {};
    } else {
      const id = obj.docs[0].id;
      const data = obj.docs[0].data();
      return { id, ...data };
    }
  }
}

module.exports = MainModel;