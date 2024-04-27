import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

// Gmail SMTP configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL, // your Gmail email address
    pass: ENV.PASSWORD, // your Gmail password
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/**
 * POST: http://localhost:8080/api/registerMail
 * @param: {
 *   "username" : "example123",
 *   "userEmail" : "admin123",
 *   "text" : "",
 *   "subject" : "",
 * }
 */
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Sameer's world We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.GMAIL_EMAIL, // sender address
    to: userEmail, // list of receivers
    subject: subject || "Signup Successful", // Subject line
    html: emailBody, // html body
  };

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
