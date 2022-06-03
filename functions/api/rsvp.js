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

const BoothActivitiesModel = require("../models/BoothActivitiesModel");
const boothActivitiesModel = new BoothActivitiesModel();

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

rsvpApp.get(
  "/rsvp/filterUsers/:filtertType/:filterText",
  async (req, res, next) => {
    try {
      const filtertType = req.params.filtertType;
      const filterText = req.params.filterText;
      const result = await userModel.filterUsers(filtertType, filterText);

      return res.status(200).json(result);
    } catch (error) {
      adeErrorHandler(error, req, res, next);
    }
  }
);

rsvpApp.get("/rsvp/getuser/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    var user = await userModel.getUserById(userId);

    if (user.email) {
      var booths = await boothModel.getBooths();

      if (booths.length != user.userBooths.length) {
        booths.forEach((booth) => {
          var foundUserBooth = user.userBooths.find(
            (x) => x.boothNum == booth.boothNum
          );

          if (!foundUserBooth) {
            user.userBooths.push({
              boothNum: booth.boothNum,
              chancesLeft: 0,
              chancesTotal: 0,
            });
          }
        });
        user.userBooths.sort((a, b) => a.boothNum - b.boothNum);
        await userModel.update(user);
      }

      if (user.userBooths && user.userBooths.length > 0) {
        user.userBooths.sort((a, b) => a.boothNum - b.boothNum);
      }

      console.log(user);

      return res.status(200).json(user);
    } else {
      return res.status(401).json("Record Not Found.");
    }
  } catch (error) {
    console.log(error);
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/summary", async (req, res, next) => {
  try {
    const result = await userModel.getUsers();

    var totalUserAttended = result.filter((x) => x.userAttend == 1).length;
    var totalGuestAttended = 0;

    var totalUserBooths = [];

    result.forEach((x) => {
      totalGuestAttended += x.guestAttend;

      if (x.userBooths && x.userBooths.length > 0) {
        x.userBooths.forEach((y) => {
          foundTotalUserBooths = totalUserBooths.find(
            (z) => z.boothNum == y.boothNum
          );

          if (foundTotalUserBooths) {
            foundTotalUserBooths.totalChances += y.chancesTotal;
            foundTotalUserBooths.chancesLeft += y.chancesLeft;
            foundTotalUserBooths.chancesUsed += y.chancesTotal - y.chancesLeft;
          } else {
            foundTotalUserBooths = {};
            foundTotalUserBooths.boothNum = y.boothNum;
            foundTotalUserBooths.totalChances = 0;
            foundTotalUserBooths.chancesLeft = 0;
            foundTotalUserBooths.chancesUsed = 0;
            totalUserBooths.push(foundTotalUserBooths);
          }

          // if (!totalUserBooths[y.boothNum]) {
          //   totalUserBooths[y.boothNum] = {};
          // }

          // totalUserBooths[y.boothNum].totalChances += y.chancesTotal;
          // totalUserBooths[y.boothNum].chancesLeft += y.chancesLeft;
          // totalUserBooths[y.boothNum].chancesUsed +=
          //   y.chancesTotal - y.chancesLeft;
        });
      }
    });

    var summary = {};
    summary.totalUserAttended = totalUserAttended;
    summary.totalGuestAttended = totalGuestAttended;
    summary.totalUser = result.length;
    summary.totalUserBooths = totalUserBooths;

    summary.sumTotalUserBooths = {
      totalChances: 0,
      chancesLeft: 0,
      chancesUsed: 0,
    };

    totalUserBooths.forEach((x) => {
      console.log(x.totalChances)
      summary.sumTotalUserBooths.totalChances += x.totalChances;
      summary.sumTotalUserBooths.chancesLeft += x.chancesLeft;
      summary.sumTotalUserBooths.chancesUsed += x.chancesUsed;
    });

    console.log(summary);

    return res.status(200).json(summary);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/GetEmptyUserBooth", async (req, res, next) => {
  try {
    var result = [];
    var booths = await boothModel.getBooths();

    if (booths.length > 0) {
      booths.forEach((booth) => {
        result.push({
          boothNum: booth.boothNum,
          chancesLeft: 0,
          chancesTotal: 0,
        });
      });
      result.sort((a, b) => a.boothNum - b.boothNum);
    }

    return res.status(200).json(result);
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

    var boothActivities = {};
    boothActivities.userId = user.id;
    boothActivities.boothNum = booth.boothNum;
    boothActivities.chancesLeft = foundUserBooth.chancesLeft;
    boothActivities.status = 1;
    boothActivities.createdDate = new Date();

    const result = await boothActivitiesModel.add(boothActivities);

    //send email
    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get(
  "/rsvp/getBoothActivitiesByUser/:userId",
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      var boothActivities = await boothActivitiesModel.getByUserId(userId);
      return res.status(200).json(boothActivities);
    } catch (error) {
      console.log(error);
      adeErrorHandler(error, req, res, next);
    }
  }
);

rsvpApp.get(
  "/rsvp/getBoothActivitiesByBooth/:boothNum",
  async (req, res, next) => {
    try {
      const boothNum = req.params.boothNum;
      var boothActivities = await boothActivitiesModel.getByBoothNum(boothNum);
      return res.status(200).json(boothActivities);
    } catch (error) {
      console.log(error);
      adeErrorHandler(error, req, res, next);
    }
  }
);

rsvpApp.post("/rsvp/updateUser", async (req, res, next) => {
  try {
    const updateUserRequest = req.body;
    console.log(updateUserRequest);
    const result = await userModel.update(updateUserRequest.user);

    for (const boothActivities of updateUserRequest.boothActivities) {
      await boothActivitiesModel.updateStatus(
        boothActivities.id,
        boothActivities.status
      );
    }

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addeUser", async (req, res, next) => {
  try {
    const updateUserRequest = req.body;
    console.log(updateUserRequest);

    var existEmail = await userModel.checkEmail(updateUserRequest.user.email);

    if (existEmail.id) {
      return res.status(405).json("Add Failed. Email is already exist.");
    }

    var existStaff = await userModel.checkEmail(updateUserRequest.user.staffId);

    if (existStaff.id) {
      return res.status(405).json("Add Failed. Staff ID is already exist.");
    }

    updateUserRequest.user.createdDate = new Date();
    const result = await userModel.add(updateUserRequest.user);

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
