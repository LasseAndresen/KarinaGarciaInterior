import {OAuth2Client} from "google-auth-library/build/src/auth/oauth2client";
import {createTransport} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class EmailUtils {
  private static async createTransporter() {
    const oauth2Client = new OAuth2Client(
      process.env['CLIENT_ID'],
      process.env['CLIENT_SECRET'],
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: process.env['REFRESH_TOKEN']
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          throw err;
          // reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    return createTransport(
      {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env['EMAIL'],
          accessToken,
          clientId: process.env['CLIENT_ID'],
          clientSecret: process.env['CLIENT_SECRET'],
          refreshToken: process.env['REFRESH_TOKEN']
        }
      } as SMTPTransport.Options
    );
  }

  static async sendEmail(email: string, subject: string, text: string) {
    const transporter = await this.createTransporter();
    const mailOptions = {
      from: process.env['EMAIL'],
      to: email,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions,
      function (err: any, data: any) {
        if (err) {
          console.log('Error Occurs');
        } else {
          console.log('Email sent successfully');
        }
      });
  }
}
