import {OAuth2Client, VerifyIdTokenOptions} from "google-auth-library/build/src/auth/oauth2client";
import {Credentials} from "google-auth-library/build/src/auth/credentials";

export class OAuthUtils {
  private static _oauth2Client: OAuth2Client;
  private static _accessToken: string | null = null;
  public static async getAccessToken(): Promise<string | null> {
    console.log('Creating client...');
    this.ensureClientInitialized();
    console.log('Getting access token...');
    const accessToken = this._accessToken ?? (await this._oauth2Client.getAccessToken()).token ?? null;
    this._accessToken = accessToken;
    return accessToken;
  }

  private static ensureClientInitialized() {
    if (!this._oauth2Client) {
      this._oauth2Client = new OAuth2Client(
        process.env['CLIENT_ID'],
        process.env['CLIENT_SECRET'],
        "https://developers.google.com/oauthplayground"
      );
      this._oauth2Client.setCredentials({
        refresh_token: process.env['REFRESH_TOKEN']
      });
    }
  }

  private static async validateAccessToken(): Promise<boolean> {
    const tokenInfo = await this._oauth2Client.verifyIdToken({
      idToken: this._oauth2Client.credentials.access_token,
    } as VerifyIdTokenOptions);

    console.log('Token info:', tokenInfo);
    return !!tokenInfo;
  }
}
