import { ErrorHandler } from '@angular/core';
import {environment} from "../../environment";

export class CustomErrorHandler implements ErrorHandler {
  public handleError(error: Error): void {
    // Do what you want here, but throw it so that it's visible on the console!
    fetch(environment.apiUrl + '/logClientError', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({error: this.getMessageFromError(error)}),
    })
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
