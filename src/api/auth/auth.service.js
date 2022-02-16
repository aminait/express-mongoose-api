import jwt from "jsonwebtoken";
import config from "@src/config";
import { sendEmail } from "@src/utils/email/sendEmail";

export const sendConfirmationEmail = async (email) => {
  const pin = generatePin();
  // update pin in db

  const mailData = {
    to: email,
    templateId: config.email.templates.confirm,
    dynamicTemplateData: {
      pin,
      email,
    },
  };

  await sendEmail(mailData);
};

export const generatePin = (digits = 4) => {
  const min = 1000;
  const max = 9999;
  let otp = Math.random() * (max - min) + min;
  return Math.trunc(otp).toString();
};

export const generateJwtToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    config.jwt.secret,
    { expiresIn: config.jwt.expiryDays }
  );

  return token;
};
