import sgMail from "@sendgrid/mail";
import config from "@src/config";

const { apiKey, verifiedAccount } = config.email;
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
export const sendEmail = async (mailData) => {
  if (!apiKey || !verifiedAccount) {
    throw Error("config.email.missing");
  }

  mailData.from = { name: "Voluntier Team", email: verifiedAccount };
  const sent = sgMail.send(mailData);
  console.log("sendEmail -> sent", sent);
  if (!sent) {
    throw Error("config.email.failure");
  }
};
