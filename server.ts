import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import bodyParser from "body-parser";
import {EmailUtils} from "./src/serverUtils/emailUtils";
import {LoggingUtils} from "./src/serverUtils/loggingUtils";


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(bodyParser.json());
  require("dotenv").config();
  const fileName = fileURLToPath(import.meta.url)
  const serverDistFolder = dirname(fileName);
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.post('/submitContactForm', (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    console.log('Submitting contract form data:', firstName, lastName, email, message);

    const name = firstName + ' ' + lastName;
    const subject = 'Test mail from ' + name + ' (' + email + ')';
    EmailUtils.sendEmail('lasse.andresen9@gmail.com', subject, message).then(() => {
      res.status(200).send('Form submitted successfully!');
    });
  });

  server.post('/logClientError', (req, res) => {
    const { error } = req.body;
    LoggingUtils.logClient(error);
    res.status(200).send('Log submitted successfully!');
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });


}

run();
