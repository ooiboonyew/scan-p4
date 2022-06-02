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

const UserModel = require("../models/UserModel");
const userModel = new UserModel();

const BoothModel = require("../models/BoothModel");
const boothModel = new BoothModel();

const UserBoothModel = require("../models/UserBoothModel");
const userBoothModel = new UserBoothModel();

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

rsvpApp.get("/rsvp/email/:rsvpId", async (req, res, next) => {
  try {
    const rsvpId = req.params.rsvpId;
    console.log(rsvpId);
    var rsvp = await rsvpModel.getRSVPById(rsvpId);
    var emailresult = await EmailNotification.sendRsvpEmail(rsvp);
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
    const result = await userModel.getUsers();

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/getuser/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    var user = await userModel.getUserById(userId);

    if (user.email) {
      if (user.userBooths && user.userBooths.length > 0) {
        user.userBooths.sort((a, b) => a.boothNum - b.boothNum);
      }

      return res.status(200).json(user);
    } else {
      return res.status(401).json("Record Not Found.");
    }
  } catch (error) {
    console.log(error);
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/guestLogin", async (req, res, next) => {
  try {
    let email = req.body.email;
    let staffId = req.body.staffId;

    var users = await userModel.getUserByEmail(email);

    if (
      users &&
      users.length > 0 &&
      email == users[0].email &&
      staffId == users[0].staffId
    ) {
      return res.status(200).json(users[0]);
    } else {
      return res.status(401).json("Invalid Email or Staff ID");
    }
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

    var existingRSVP = await rsvpModel.checkRSVPEmail(rsvp.email);

    if (existingRSVP.id) {
      return res
        .status(405)
        .json(
          "Our record shows that you have already registered for this event. For assistance, please write to hhglobalevents@gmail.com."
        );
    }

    const resultId = await rsvpModel.add(rsvp);
    rsvp.id = resultId;
    var result = await EmailNotification.sendRsvpEmail(rsvp);
    rsvp.emailDate = new Date();
    var updatedRsvp = await rsvpModel.update(rsvp);

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/update", async (req, res, next) => {
  try {
    const rsvp = req.body;
    rsvp.email = rsvp.email.toLowerCase();
    console.log(rsvp);
    const result = await rsvpModel.update(rsvp);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/checkin", async (req, res, next) => {
  try {
    const user = req.body;
    user.lastCheckInDate = new Date();
    console.log(user);
    const result = await userModel.update(user);
    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/playBooth", async (req, res, next) => {
  try {
    const playBoothRequest = req.body;

    var user = await userModel.getUserById(playBoothRequest.userId);
    var booth = (await boothModel.getBoothByNum(playBoothRequest.boothNum))[0];

    console.log(booth);
    if (!booth || booth.status == 0) {
      return res
        .status(405)
        .json("Booth " + playBoothRequest.boothNum + " is closed.");
    }

    if (booth.secretDigit != playBoothRequest.secretDigit) {
      return res
        .status(405)
        .json("Secret Key Incorrect for Booth " + booth.boothNum + ".");
    }

    var foundUserBooth = user.userBooths.find(
      (x) => x.boothNum == booth.boothNum
    );

    if (!foundUserBooth || foundUserBooth.chancesLeft < 1) {
      return res
        .status(405)
        .json("Not enough chance for Booth " + booth.boothNum + ".");
    }

    foundUserBooth.chancesLeft -= 1;
    const userResult = await userModel.update(user);

    var userBooth = {};
    userBooth.userId = user.id;
    userBooth.boothNum = booth.boothNum;
    userBooth.chancesLeft = foundUserBooth.chancesLeft;
    userBooth.status = 1;
    userBooth.createdDate = new Date();
    
    const result = await userBoothModel.add(userBooth);

    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
