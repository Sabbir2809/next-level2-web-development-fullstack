import nodemailer from "nodemailer";
import config from "../config";

const emailSender = async (receiverEmail: string, htmlBody: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.env === "production",
    auth: {
      user: config.emailSender.smtp_email,
      pass: config.emailSender.smtp_password,
    },
  });

  await transporter.sendMail({
    from: config.emailSender.smtp_email, // sender address
    to: receiverEmail, // list of receivers
    subject: "Reset Your Password within 5 Minutes", // Subject line
    text: "", // plain text body
    html: htmlBody, // html body
  });
};

export default emailSender;
