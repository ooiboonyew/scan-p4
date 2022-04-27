var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  //port: 587,
  auth: {
    user: "hhglobalevents@gmail.com",
    pass: "hfmjajibkudqotbz",
  },
});

async function sendRsvpEmail(rsvp) {
  // const from = {
  //   email: "hhglobalevents@gmail.com",
  //   name: "Alcon Singapore Event",
  // };

  const from = `Alcon Singapore Event <hhglobalevents@gmail.com`;
  const to = rsvp.email;

  var subject = "";
  if (rsvp.attending == 0) {
    subject =
      "Alcon Centurion® Active Sentry® Official Launch Event - Registration Confirmation";
  } else {
    subject =
      "Alcon Centurion® Active Sentry® Official Launch Event - Registration";
  }

  var message = "";

  if (rsvp.attending == 0) {
    message = `
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
<img class="banner" src="https://alconcenturionrsvp.web.app/WebBannerDesktop_970x250-27Apr@3x.3d989a4d61ba950afc3e.png" >
<p>Dear ${rsvp.firstName} ${rsvp.lastName},</p>
<p>Thank you for your RSVP to Alcon Centurion<sup>&reg;</sup> Active Sentry<sup>&reg;</sup> Official Launch Event on 11 May 2022.</p>
<p>Date: 11 May 2022, Wednesday<br />
Time: 6.30pm - 9pm (Registration starts at 6pm)<br />
Venue: The Pavilion, Level 4, Conrad Centennial Singapore</p>
<p>Add to your calendar <br />
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
  } else {
    message = `
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
  <img class="banner" src="https://alconcenturionrsvp.web.app/WebBannerDesktop_970x250-27Apr@3x.3d989a4d61ba950afc3e.png" >
  <p>Dear ${rsvp.firstName} ${rsvp.lastName},</p>
  <p>Thank you for your RSVP to Alcon Centurion<sup>&reg;</sup> Active Sentry<sup>&reg;</sup> Official Launch Event on 11 May 2022, 6.30pm.</p>
  <p>You will receive the event log-in link (via zoom platform) within the next 2 working days. Should you have any questions, you may contact our Alcon Sales Team.</p>
  <p>We look forward to seeing you virtually!</p>
  <p>Thank you.</p>
  <p>With kind regards, <br/>Sent on behalf of Alcon Singapore Team</p>
  </div>
  </body>
  </html>
  `;
  }
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: message,
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
