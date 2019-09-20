const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/internal': jsonHandler.internalServerError,
  '/forbidden': jsonHandler.forbidden,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const urlStructXML = {
  '/success': xmlHandler.success,
  '/badRequest': xmlHandler.badRequest,
  '/unauthorized': xmlHandler.unauthorized,
  '/internal': xmlHandler.internalServerError,
  '/forbidden': xmlHandler.forbidden,
  '/notImplemented': xmlHandler.notImplemented,
  notFound: xmlHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    if (request.headers.accept === 'text/xml') {
      urlStructXML[parsedUrl.pathname](request, response, params);
    } else {
      urlStruct[parsedUrl.pathname](request, response, params);
    }
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
