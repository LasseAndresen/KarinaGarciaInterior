import * as https from "https";
import {IncomingMessage} from "http";
import {OAuthUtils} from "./OAuthUtils";

type LogLevel = 'INFO' | 'WARNING' | 'ERROR' | 'NOTICE' | 'DEBUG' | 'ALERT' | 'CRITICAL' | 'EMERGENCY';

export class LoggingUtils {
  static logServer(message: string, logLevel: LogLevel): void {
    writeToGoogleCloudLog(message, logLevel, 'ServerLogs');
  }

  public static logClient(message: string): void {
    writeToGoogleCloudLog(message, 'ERROR', 'WebClientLogs');
  }
  //
  public static getMessageFromError(error: Error): string {
    let message = "";
    if (error.message) {
      message += error.message;
    }
    if (error.stack) {
      message += ' | stack: ' + error.stack;
    }

    return message;
  }
}

async function writeToGoogleCloudLog(message: string, logLevel: LogLevel, logName: string): Promise<void> {
  const projectId = 'karina-garcia-interiors';

  const logEntry = {
    logName: `projects/${projectId}/logs/${logName}`,
    resource: {
      type: 'global',
    },
    entries: [
      {
        severity: logLevel,
        textPayload: message,
      },
    ],
  };

  const postData = JSON.stringify(logEntry);

  const accessToken = await OAuthUtils.getAccessToken();
  const options = {
    hostname: 'logging.googleapis.com',
    path: `/v2/entries:write?access_token=${accessToken}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };

  const req = https.request(options, (res: IncomingMessage) => {
    console.log(`Added log. StatusCode: ${res.statusCode}`);
  });

  req.on('error', (error: Error) => {
    process.stdout.write('Error: ' + error);
  });

  req.write(postData);
  req.end();
}
