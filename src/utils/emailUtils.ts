import {OAuth2Client} from "google-auth-library/build/src/auth/oauth2client";
import {createTransport} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {LoggingUtils} from "./loggingUtils";
import {OAuthUtils} from "./OAuthUtils";

export class EmailUtils {
  private static async createTransporter() {
    const accessToken = await OAuthUtils.getAccessToken();

    console.log('Creating transporter...');
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

    console.log('Sending email...');
    transporter.sendMail(mailOptions,
      function (err: Error | null, data: any) {
        if (err) {
          let errorMessage = LoggingUtils.getMessageFromError(err);
          errorMessage += '\nContent: ' + JSON.stringify(mailOptions);
          LoggingUtils.logServer(errorMessage, 'ERROR');
        } else {
          LoggingUtils.logServer('Email sent successfully from ' + email, 'INFO');
        }
      });
  }
}
