import nodemailer from "nodemailer";

import { EMAIL_PASS } from "./env.js";

export const accountMail = "rohitsarwadikar25@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountMail,
    pass: EMAIL_PASS,
  },
});

export default transporter;