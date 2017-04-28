/* eslint no-console: 0 */

const jsdom = require('jsdom');
const app = require('./app');

module.exports.handle = (request, context, callback) => {
  const route = request.pathParameters && request.pathParameters.route || '';
  const docType = '<!DOCTYPE html>';
  const staticRoot = process.env.STATIC_ROOT || '';

  jsdom.env({
    url: process.env.API_HOST + route,
    html: `
      ${docType}
      <html>
        <head>
          <base href="/dev/view/" />
          <link rel="shortcut icon" href="${staticRoot}/favicon.ico" type="image/x-icon">
          <link rel="icon" href="${staticRoot}/favicon.ico" type="image/x-icon">
          <link rel="stylesheet" type="text/css" href="${staticRoot}/css/styles.css" />
        </head>
        <body>
          <script src="${staticRoot}/bundle.js"></script>
        </body>
      </html>
    `,
    done: (error, window) => {
      if(error) {
        callback(error);
      }
      else {
        app(window).then(() => {
          callback(null, {
            statusCode: 200,
            headers: {
              'content-type': 'text/html'
            },
            body: docType + window.document.documentElement.outerHTML
          });
        }).catch(err => console.error(err));
      }
    }
  });
}
