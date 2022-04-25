var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 587,
  auth: {
    user: "hhglobalevents@gmail.com",
    pass: "Hhg12345",
  },
});

async function sendRsvpEmail(rsvp) {
  const from = {
    email: "hhglobalevents@gmail.com",
    name: "Alcon Singapore Event",
  };

  const to = rsvp.email;
  const subject =
    "Alcon Centurion Active Sentry Official Launch Event - Registration Confirmation";

  var message = `
  <html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting" />
<style>
p {font-family: Arial; font-size:12px;line-height: 1.6}
.banner {width:100%;}
</style>
</head>
<body>
<div class="main">
<img class="banner" src="" >
<p>Dear ${rsvp.firstName} ${rsvp.lastName},</p>
<p>Thank you for your RSVP to Alcon Centurion Active Sentry Official Launch Event on 11 May 2022 at 6:30pm.</p>
<p>Add to your caleander <br />
<a href="https://www.addevent.com/event/GE13551434+apple" title="Apple" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-apple-t1.png" alt="Apple" width="45" border="0" style="width:45px;display:inline;"></a> 
<a href="https://www.addevent.com/event/GE13551434+google" title="Google" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-google-t1.png" alt="Google" width="45" border="0" style="width:45px;display:inline;"></a>
<a href="https://www.addevent.com/event/GE13551434+office365" title="Office 365" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-office365-t1.png" alt="Office 365" width="45" border="0" style="width:45px;display:inline;"></a>
<a href="https://www.addevent.com/event/GE13551434+outlook" title="Outlook" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlook-t1.png" alt="Outlook" width="45" border="0" style="width:45px;display:inline;"></a> 
<a href="https://www.addevent.com/event/GE13551434+outlookcom" title="Outlook.com" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlookcom-t1.png" alt="Outlook.com" width="45" border="0" style="width:45px;display:inline;"></a> 
<a href="https://www.addevent.com/event/GE13551434+yahoo" title="Yahoo" target="_blank" style="display:inline;"><img src="https://cdn.addevent.com/libs/imgs/icon-emd-share-yahoo-t1.png" alt="Yahoo" width="45" border="0" style="width:45px;display:inline;"></a>
</p>
<p>We look forward to seeing you! Should you have any questions, you may contact our Alcon Sales Team.</p>
<p>Thank you.</p>
<p>With kind regards, <br/>Sent on behalf of Alcon Singapore Team</p>
</div>
</body>
</html>
`;

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: message,
  };

  return await transporter.sendMail(mailOptions);

  // await transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     // console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
}

module.exports = {
  sendRsvpEmail,
};
