const CSVToJSON = require("csvtojson");
const functions = require("firebase-functions");
const {
  verifyToken,
  adeErrorHandler,
  addResponseHeader,
} = require("../common/middlewares");
const EmailNotification = require("../common/helpers/EmailNotification");

const express = require("express");
const cors = require("cors");
const rsvpApp = express();
rsvpApp.use(cors({ origin: true }));

const RsvpModel = require("../models/RsvpModel");
const rsvpModel = new RsvpModel();

const SettingModel = require("../models/SettingModel");
const settingModel = new SettingModel();

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

rsvpApp.get("/rsvp/listusers", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();

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

rsvpApp.get("/rsvp/summary", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();
    var summary = {};
    summary.totalGuest = result.length;
    summary.totalGuestCheckedIn = result.filter(
      (x) => x.checkedIn == true
    ).length;

    var totalTableZones = _.map(
      _.groupBy(result, (x) => x.tableZone),
      (vals, key) => {
        return {
          tableZone: Number(key),
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalTableZones = totalTableZones;

    var totalTables = _.map(
      _.groupBy(result, (x) => x.table),
      (vals, key) => {
        return {
          table: Number(key),
          total: vals.length,
          totalCheckedIn: vals.filter((x) => x.checkedIn == true).length,
        };
      }
    );

    summary.totalTable = totalTables;

    console.log(summary);
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

    for (const user of csvData) {
      var userData = {
        email: user.email,
        table: user.table,
        tableZone: user.tableZone,
      };

      var existStaff = await rsvpModel.checkEmail(userData.email);

      if (existStaff.id) {
        console.log(existStaff);
        userData.id = existStaff.id;
        console.log(JSON.stringify(userData));

        const result = await rsvpModel.update(userData);
      }
    }

    return res.status(200).json("success");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/checkinGuest", async (req, res, next) => {
  try {
    let email = req.body.email;
    let name = req.body.name;

    var rsvp = await rsvpModel.checkEmail(email);

    if (!rsvp.id) {
      return res.status(405).json("Email not found.");
    }

    if (rsvp.name.toLowerCase() != name.toLowerCase()) {
      return res.status(405).json("Name not found.");
    }

    if (rsvp.checkedIn) {
      return res.status(405).json("User already check in.");
    }

    rsvp.checkedInDate = new Date();
    rsvp.checkedIn = true;
    await rsvpModel.update(rsvp);

    const result = await rsvpModel.getRSVPById(rsvp.id);
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/admin/login", async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let hardEmail = "admin@rsvp.com";
    let hardPassword = "admin@123";

    if (email == hardEmail && password == hardPassword) {
      return res.status(200).json({ adminID: 1, name: "Admin", email: email });
    } else {
      return res.status(401).json("Invalid Email or Password");
    }
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/add", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.createdDate = new Date();
    rsvp.email = rsvp.email.toLowerCase();

    if (rsvp.attending && rsvp.email) {
      var existingRSVP = await rsvpModel.checkRSVPEmail(rsvp.email);

      if (existingRSVP.id) {
        return res
          .status(405)
          .json(
            "Your email shows that you have already registered for this event."
          );
      }
    }

    if (rsvp.attending && rsvp.mobile) {
      var existingRSVP = await rsvpModel.checkRSVPMobile(rsvp.mobile);

      if (existingRSVP.id) {
        return res
          .status(405)
          .json(
            "Your Mobile Number shows that you have already registered for this event."
          );
      }
    }

    const resultId = await rsvpModel.add(rsvp);
    rsvp.id = resultId;
    if (rsvp.attending && rsvp.email) {
      console.log("here 2");
      var result = await EmailNotification.sendRsvpEmail(rsvp);
      rsvp.emailDate = new Date();
      var updatedRsvp = await rsvpModel.update(rsvp);
    }

    return res.status(200).json(resultId);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/update", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.email = rsvp.email.toLowerCase();
    console.log(rsvp);

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

rsvpApp.post("/rsvp/checkin", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.checkedInDate = new Date();
    rsvp.checkedIn = true;
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
