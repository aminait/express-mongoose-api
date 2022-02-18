import sgMail from '@sendgrid/mail';
import config from '@src/config';

const { apiKey, verifiedAccount } = config.email;
console.log('apiKey', apiKey);
sgMail.setApiKey(apiKey);

/**
 * @param {Object} mailData
// const mailData = {
//   from: {
//     name: String
//   },
//   templateId: String
//   to: String
//   dynamicTemplateData: Object
// };
 * @returns {type}
 */
const sendEmail = async (mailData) => {
  if (!apiKey || !verifiedAccount) {
    throw Error('config.email.missing');
  }
  mailData.from = verifiedAccount;
  // mailData.from = { name: "Voluntier Team", email: verifiedAccount };
  sgMail
    .send(mailData)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmail;
// const msg = {
//   to: "aminait@outlook.com", // Change to your recipient
//   from: "aminait@outlook.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

// sendEmail(msg);
