import { NextResponse } from "next/server";
export async function POST(request) {
  const res = await request.json();
  let nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.titan.email",
    auth: {
      user: "admin@indrajohn.com.au",
      pass: "P@ssw0rd123!",
    },
    secure: true,
  });

  const mailData = {
    from: "admin@indrajohn.com.au",
    to: "admin@indrajohn.com.au",
    subject: `Message From Contact me`,
    text: JSON.stringify(res),
    html: `<div>${JSON.stringify(res)}</div>`,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log(info);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ res });
}
