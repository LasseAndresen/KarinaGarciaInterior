import { ErrorHandler } from '@angular/core';
import {environment} from "../../environment";

export class CustomErrorHandler implements ErrorHandler {
  public handleError(error: Error): void {
    if (environment.localhost) {
     throw error;
    } else {
      fetch(environment.apiUrl + '/logClientError', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({error: this.getMessageFromError(error)}),
      })
    }
  }

  private getMessageFromError(error: Error): string {
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
