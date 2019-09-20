const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const success = (request, response) => {
  const responseXML = '<response><message>This is a successful response.</message></response>';

  respondXML(request, response, 200, responseXML);
};

// Function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  let responseXML = '<response><message>This request has the required parameter.</message></response>';

  // If the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response><message>Missing valid query parameter set to true.</message><id>badrequest</id></response>';

    return respondXML(request, response, 400, responseXML);
  }

  return respondXML(request, response, 200, responseXML);
};

// Function to show an unauthorized request without the correct parameters
const unauthorized = (request, response, params) => {
  let responseXML = '<response><message>You have successfully viewed this content.</message></response>';

  // If the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseXML = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';

    return respondXML(request, response, 401, responseXML);
  }

  return respondXML(request, response, 200, responseXML);
};

// Function to show forbidden error
const forbidden = (request, response) => {
  const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

  respondXML(request, response, 403, responseXML);
};

// Function to show internal server error
const internalServerError = (request, response) => {
  const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internal</id></response>';

  respondXML(request, response, 500, responseXML);
};

// Function to show not implemented error
const notImplemented = (request, response) => {
  const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';

  respondXML(request, response, 501, responseXML);
};

// Function to show not found error
const notFound = (request, response) => {
  const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';

  respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalServerError,
  notImplemented,
  notFound,
};
