var nodemailer = require("nodemailer");
var path = require("path");

var transporter = nodemailer.createTransport({
  // service: "gmail",
  // host: "SchoolsWPS2022.sgrsvp.com",
  host: "mail.privateemail.com",

  port: "587",
  auth: {
    user: "SchoolsWPS2022@sgrsvp.com",
    pass: "Wpsadmin1234",
  },
});

async function sendRsvpEmail(rsvp) {
  // const from = {
  //   email: "hhglobalevents@gmail.com",
  //   name: "Alcon Singapore Event",
  // };

  const from = `Schools WPS <SchoolsWPS2022@sgrsvp.com>`;
  const to = rsvp.email;

  var subject =
    "Confirmation of RSVP to MOE’s Schools Work Plan Seminar (WPS) 2022";

  var message = `
  <html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting" />
<style>
p {font-family: Arial; font-size:12px;line-height: 1.6}
.banner {display: block;}
</style>
</head>
<body>
<div class="main">
<img class="banner" alt="web_image" width="100%" src="cid:edm-web" /> 
<p>Dear Colleagues,</p><br />
<p>Thank you for your RSVP to MOE’s Schools Work Plan Seminar (WPS) 2022.</p>
<p>More details will be shared via your registered email and SMS closer to the event date.</p>
<p>For enquiries, please contact <a href="mailto:MOE_WPS@moe.gov.sg"> MOE_WPS@moe.gov.sg</a>.</p>
<p>We look forward seeing you at the event!</p><br />
<p>Thank you.</p>
<p>MOE WPS Team</p>
</div>
</body>
</html>
`;

  var imagePath = path.join(
    __dirname,
    "../../images/Mail Banner.jpg"
  ); // In this line, Give the full path of image.

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: message,
    attachments: [
      {
        filename: "Mail Banner.jpg",
        path: imagePath,
        cid: "edm-web", //same cid value as in the html img src
      },
    ],
  };

  return await transporter.sendMail(mailOptions);

  // transporter.sendMail(mailOptions, function (error, info) {
  //   console.log("here");
  //   console.log(info);
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
}

module.exports = {
  sendRsvpEmail,
};
