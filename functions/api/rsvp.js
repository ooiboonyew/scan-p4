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

const UserModel = require("../models/UserModel");
const userModel = new UserModel();

const BoothModel = require("../models/BoothModel");
const boothModel = new BoothModel();

const BoothActivitiesModel = require("../models/BoothActivitiesModel");
const boothActivitiesModel = new BoothActivitiesModel();

const SettingModel = require("../models/SettingModel");
const settingModel = new SettingModel();

const _ = require("lodash");
const converter = require("json-2-csv");

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
    const result = await boothActivitiesModel.getBoothActivities();

    var simply = [];
    result.forEach((x) =>
      simply.push({
        num: x.num,
        email: x.email,
        boothNum: x.boothNum,
        status: x.status == 1 ? "Completed" : "Cancelled",
        createdDate: new Date(
          JSON.parse(JSON.stringify(x.createdDate))._seconds * 1000
        ).toLocaleString(),
        chancesLeft: x.chancesLeft,
      })
    );

    let json2csvCallback = function (err, csv) {
      if (err) throw err;
      res.attachment("booth_activitites.csv");
      res.send(csv);
      return res.status(200);
    };

    converter.json2csv(simply, json2csvCallback);

    // converter.json2csv(simply, (err, csv) => {
    //   if (err) {
    //     throw err;
    //   }
    //   res.setHeader('Content-Type', 'text/csv');
    //   res.attachment("booth_activitites.csv");
    //   res.status(200).send(csv);
    //   // print CSV string
    //   return res.status(200).json(simply);

    //   Response.Clear();
    //   Response.ContentType = "application/CSV";
    //   Response.AddHeader("content-disposition", "attachment; filename=\"" + filename + ".csv\"");
    //   Response.Write(t.ToString());
    //   Response.End();
    // });
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

rsvpApp.get("/rsvp/getSetting/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await settingModel.getById(id);
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
      var result = [];
      // if (filtertType == "name") {
      //   result = await userModel.filterNamelUsers(filterText);
      // } else if (filtertType == "staffId") {
      //   result = await userModel.filterStaffIdUsers(filterText);
      // } else {
      //   result = await userModel.filterEmailUsers(filterText);
      // }
      result = await userModel.filterEmailUsers(filterText);

      return res.status(200).json(result);
    } catch (error) {
      adeErrorHandler(error, req, res, next);
    }
  }
);

// rsvpApp.get(
//   "/rsvp/filterUsers/:filterText",
//   async (req, res, next) => {
//     try {
//       const filterText = req.params.filterText;
//       const result = await userModel.filterEmailUsers(filterText);

//       return res.status(200).json(result);
//     } catch (error) {
//       adeErrorHandler(error, req, res, next);
//     }
//   }
// );

rsvpApp.get("/rsvp/getuser/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    var user = await userModel.getUserById(userId);

    if (user.email) {
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

    result.forEach((x) => {
      totalGuestAttended += x.guestAttend;
    });

    var totalBoothActivies = [];

    var boothActivies = await boothActivitiesModel.getBoothActivities();

    // var grouped = boothActivies.groupBy(({ boothNum }) => boothNum);

    totalBoothActivies = _.map(
      _.groupBy(boothActivies, (x) => x.boothNum),
      (vals, key) => {
        return { boothNum: Number(key), chancesUsed: vals.length };
      }
    );

    console.log(totalBoothActivies);

    var summary = {};
    summary.totalUserAttended = totalUserAttended;
    summary.totalGuestAttended = totalGuestAttended;
    summary.totalUser = result.length;
    summary.totalBoothActivies = totalBoothActivies;

    summary.sumTotalBoothActivies = {
      chancesUsed: 0,
    };

    totalBoothActivies.forEach((x) => {
      console.log(x);
      summary.sumTotalBoothActivies.chancesUsed += x.chancesUsed;
    });

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
        createdDate: new Date(),
        userAttend: 0,
        guestAttend: 0,
        chancesTotal: Number(user.chancesTotal),
        chancesLeft: Number(user.chancesTotal),
      };

      if (userData.chancesTotal > 0) {
        if (userData.chancesTotal > 4) {
          userData.userAvailable = 1;
          userData.guestAvailable = 3;
        } else if (userData.chancesTotal == 1) {
          userData.userAvailable = 1;
          userData.guestAvailable = 0;
        } else {
          userData.userAvailable = 1;
          userData.guestAvailable = userData.chancesTotal - 1;
        }
      } else {
        userData.userAvailable = 0;
        userData.guestAvailable = 0;
      }

      // var existStaff = await userModel.checkStaffId(userData.staffId);
      var existStaff = await userModel.checkEmail(userData.email);

      // console.log(JSON.stringify(userData));

      if (existStaff.id) {
        userData.id = existStaff.id;
        const result = await userModel.update(userData);
      } else {
        const result = await userModel.add(userData);
      }
    }

    return res.status(200).json("success");
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/guestLogin", async (req, res, next) => {
  try {
    console.log("jere");
    let email = req.body.email;
    // let staffId = req.body.staffId;

    var users = await userModel.getUserByEmail(email);

    if (
      users &&
      users.length > 0 &&
      email == users[0].email
      // && staffId == users[0].staffId
    ) {
      return res.status(200).json(users[0]);
    } else {
      return res.status(401).json("Invalid Email");
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

    // var existingRSVP = await rsvpModel.checkRSVPEmail(rsvp.email);

    // if (existingRSVP.id) {
    //   return res
    //     .status(405)
    //     .json(
    //       "Our record shows that you have already registered for this event."
    //     );
    // }

    const resultId = await rsvpModel.add(rsvp);
    rsvp.id = resultId;
    // var result = await EmailNotification.sendRsvpEmail(rsvp);
    // rsvp.emailDate = new Date();
    // var updatedRsvp = await rsvpModel.update(rsvp);

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
      return res.status(405).json(playBoothRequest.boothName + " is closed.");
    }

    if (booth.secretDigit != playBoothRequest.secretDigit) {
      return res
        .status(405)
        .json("Secret Key Incorrect for " + booth.boothName + ".");
    }

    if (user.chancesLeft < 1) {
      return res
        .status(405)
        .json("Not enough chance for " + booth.boothName + ".");
    }

    user.chancesLeft -= 1;
    const userResult = await userModel.update(user);

    var boothActivities = {};
    boothActivities.userId = user.id;
    // boothActivities.name = user.name;
    // boothActivities.staffId = user.staffId;
    boothActivities.email = user.email;
    boothActivities.boothNum = booth.boothNum;
    boothActivities.chancesLeft = user.chancesLeft;
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
      const boothNum = Number(req.params.boothNum);
      var boothActivities = await boothActivitiesModel.getByBoothNum(boothNum);
      console.log(boothActivities);
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
        Number(boothActivities.status)
      );
    }

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addUser", async (req, res, next) => {
  try {
    const updateUserRequest = req.body;
    console.log(updateUserRequest);

    var existEmail = await userModel.checkEmail(updateUserRequest.user.email);

    if (existEmail.id) {
      return res.status(405).json("Add Failed. Email is already exist.");
    }

    // var existStaff = await userModel.checkEmail(updateUserRequest.user.staffId);

    // if (existStaff.id) {
    //   return res.status(405).json("Add Failed. Staff ID is already exist.");
    // }

    updateUserRequest.user.createdDate = new Date();
    const result = await userModel.add(updateUserRequest.user);

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.get("/rsvp/listBooth", async (req, res, next) => {
  try {
    const result = await boothModel.getBooths();

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/updateBooth", async (req, res, next) => {
  try {
    const updateBoothRequest = req.body;
    const result = await boothModel.update(updateBoothRequest.booth);

    for (const boothActivities of updateBoothRequest.boothActivities) {
      await boothActivitiesModel.updateStatus(
        boothActivities.id,
        Number(boothActivities.status)
      );
    }

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.post("/rsvp/addBooth", async (req, res, next) => {
  try {
    const booth = req.body;
    var exist = await boothModel.checkBoothNum(booth.boothNum);

    if (exist.id) {
      return res.status(405).json("Add Failed. Booth Number is already exist.");
    }

    booth.createdDate = new Date();
    const result = await boothModel.add(booth);

    return res.status(200).json(result);
  } catch (error) {
    adeErrorHandler(error, req, res, next);
  }
});

rsvpApp.use(adeErrorHandler);

exports.rsvp = functions.region("asia-southeast1").https.onRequest(rsvpApp);
