const CSVToJSON = require("csvtojson");
const functions = require("firebase-functions");
const { adeErrorHandler, addResponseHeader } = require("../common/middlewares");

const express = require("express");
const cors = require("cors");
const rsvpApp = express();
rsvpApp.use(cors({ origin: true }));

const RsvpModel = require("../models/RsvpModel");
const rsvpModel = new RsvpModel();

const SettingModel = require("../models/SettingModel");
const settingModel = new SettingModel();

const AdminModel = require("../models/AdminModel");
const adminModel = new AdminModel();

const ConfigModel = require("../models/ConfigModel");
const configModel = new ConfigModel();

const _ = require("lodash");
const converter = require("json-2-csv");

// rsvpApp.use(verifyToken);
rsvpApp.use(addResponseHeader);

rsvpApp.get("/", async (req, res, next) => {
  try {
    return res.status(200).json("ok");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp", async (req, res, next) => {
  try {
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/email/:rsvpId", async (req, res, next) => {
  try {
    const rsvpId = req.params.rsvpId;
    console.log(rsvpId);
    var rsvp = await rsvpModel.getRSVPById(rsvpId);
    // var emailresult = await EmailNotification.sendRsvpEmail(rsvp);
    rsvp.emailDate = new Date();
    var updatedRsvp = await rsvpModel.update(rsvp);

    return res.status(200).json(updatedRsvp);
  } catch (error) {
    console.log(error);
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/listRSVP", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/listConfig", async (req, res, next) => {
  try {
    const result = await configModel.getConfig();

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/getSetting/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await settingModel.getById(id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/getrsvp/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await rsvpModel.getRSVPById(id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/GetRSVPByQR/:qr", async (req, res, next) => {
  try {
    const qr = req.params.qr;

    const result = await rsvpModel.getRSVPbyQR(qr);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/summary", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();
    var summary = {};
    summary.totalGuest = result.length;
    summary.totalGuestCheckedIn = result.filter(
      (x) => x.checkedIn == true
    ).length;

    var totalCategory = _.map(
      _.groupBy(result, (x) => x.category),
      (vals, key) => {
        return {
          category: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalCategory = totalCategory;

    var totalData1 = _.map(
      _.groupBy(result, (x) => x.data1),
      (vals, key) => {
        return {
          data1: key,
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalData1 = totalData1;

    // console.log(summary);
    return res.status(200).json(summary);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

rsvpApp.post("/rsvp/import", async (req, res, next) => {
  try {
    var data = req.body.toString("utf8");
    data = data.substring(data.indexOf("text/csv") + 8);
    let csv = data.split("---")[0];
    const csvData = await CSVToJSON().fromString(csv.trim());
    console.log(csvData);

    for (const rsvp of csvData) {
      var rsvpData = {
        firstName: rsvp.firstName,
        lastName: rsvp.lastName,
        email: rsvp.email.toLowerCase(),
        category: rsvp.category,
        company: rsvp.company,
        data1: rsvp.data1,
        data2: rsvp.data2,
        data3: rsvp.data3,
        data4: rsvp.data4,
        data5: rsvp.data5,
        qr: rsvp.qr,
        checkedIn: false,
        createdDate: new Date(),
      };

      var existStaff = await rsvpModel.checkEmail(rsvpData.email);

      if (existStaff.id) {
        rsvpData.id = existStaff.id;
        const result = await rsvpModel.update(rsvpData);
      } else {
        const result = await rsvpModel.add(rsvpData);
      }
    }

    return res.status(200).json("success");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/admin/login", async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    var admin = await adminModel.checkAdmin(email);

    if (admin && admin.password == password) {
      return res.status(200).json(admin);
    } else {
      return res.status(401).json("Invalid Email or Password");
    }

    // let hardEmail = "admin@rsvp.com";
    // let hardPassword = "admin@123";

    // let hardEmail2 = "checkin@rsvp.com";
    // let hardPassword2 = "check@in";

    // if (email == hardEmail && password == hardPassword) {
    //   return res.status(200).json({ adminID: 1, name: "Admin", email: email });
    // } else if (email == hardEmail2 && password == hardPassword2) {
    //   return res.status(200).json({ adminID: 2, name: "Admin", email: email });
    // } else {
    //   return res.status(401).json("Invalid Email or Password");
    // }
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/add", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.createdDate = new Date();
    await rsvpModel.add(rsvp);
    // rsvp.id = resultId;

    return res.status(200).json();
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/update", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.email = rsvp.email.toLowerCase();

    if (rsvp.checkedIn) {
      rsvp.checkedInDate = new Date();
    } else {
      rsvp.checkedInDate = null;
    }

    const result = await rsvpModel.update(rsvp);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addconfig", async (req, res, next) => {
  try {
    const data = req.body;
    const resultId = await configModel.add(data);

    return res.status(200).json(resultId);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/updateConfig", async (req, res, next) => {
  try {
    const data = req.body;
    const result = await configModel.update(data);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/deleteConfig/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await configModel.delete(id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/checkin", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.checkedInDate = new Date();
    rsvp.checkedIn = true;
    console.log(rsvp);

    if (rsvp.rsvpId) {
      rsvp.id = rsvp.rsvpId;
    }

    await rsvpModel.update(rsvp);
    const result = await rsvpModel.getRSVPById(rsvp.id);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
