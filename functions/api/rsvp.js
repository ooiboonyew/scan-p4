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

// rsvpApp.use(verifyToken);
rsvpApp.use(addResponseHeader);

rsvpApp.get("/", async (req, res, next) => {
  try {
    // const result = await rsvpModel.getRSVP();
    return res.status(200).json("Ok");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/emailtest", async (req, res, next) => {
  try {
    const result = await rsvpModel.getRSVP();

    var emailresult = await EmailNotification.sendRsvpEmail(result[0]);
    return res.status(200).json(emailresult);
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
    console.log(rsvp);
    const result = await rsvpModel.add(rsvp);

    //await EmailNotification.sendRsvpEmail(rsvp);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/update", async (req, res, next) => {
  try {
    const rsvp = req.body;
    console.log(rsvp);
    const result = await rsvpModel.update(rsvp);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
