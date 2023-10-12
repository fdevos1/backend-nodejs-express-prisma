import nodemailer from "nodemailer";

import { NotFoundError } from "../helpers/api-error";
import { prismaClient } from "../prisma/prismaClient";

export class SendRecoveryPass {
  async handle(req, res) {
    const { email, otp } = req.body;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fbaa5065cab552",
        pass: "5f40351ed389e5",
      },
    });

    const mail_configs = {
      from: "desafiogaruparecuperarsenha@gmail.com",
      to: email,
      subject: "Reset password",
      html: `
<!DOCTYPE html>
  <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>Reset password</title>
  

    </head>
    <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 16px;background-color:#121212;border-radius:4px;">
      <div style="border-bottom:1px solid #414141">
      <a href="" style="font-size:1.4em;color: #fff;text-decoration:none;font-weight:600">Desafio Garupa</a>
      </div>
      <p style="font-size:1.1em;color:#f7f7f7">Hello! Use the code below to reset your password</p>
      <h2 style="background: #0b0b0b;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <hr style="border:none;border-top:1px solid #414141" />
      </div>
      </div>
      <!-- partial -->
  
    </body>
  </html>
      `,
    };

    transport.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: `Ocorreu um erro` });
      }
      return res.json({ message: "E-mail enviado com sucesso" });
    });
  }
}
