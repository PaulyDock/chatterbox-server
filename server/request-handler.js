
//*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


const postBuilder = function(message) {
  //key value pair with = instead of 
  //build array split on & (figure escaping/regex)
  let splitMsg = message.split('&');
  //map over that array, splitting on = (result is array of tuples)
  let tuples = splitMsg.map((pair) => {
    return pair.split('=');
  });
  let newMessage = {};
  tuples.forEach((tuple) => {
    newMessage[tuple[0]] = tuple[1];
  });
  
  newMessage['createdAt'] = (new Date()).toString();
  // console.log(newMessage);
  return newMessage;
  //iterate over tuples, obj[tuple[0]] = obj  
};

const routingHandler = function(method, url, message) {
  endPoint = url.split('?')[0];
  if (method === 'GET' && endPoint === '/classes/messages') {
  
  }
    // responseBody = entire list of messages
    //

  if (method === 'POST' && endPoint === '/classes/messages') {
    postBuilder(message);
    
    //push message to entire list of messages
  }
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  //console.log('request.header: ', request.headers);
  // ********** request builder ************
  var method = request.method;
  var url = request.url;
    

  var initial = [{username: 'boy', text: 'fake text is best text', createdAt: new Date, roomname: 'emoroom'}];

  var body = [];

  request.on('data', function(data) {
    console.log('datas', data.toString('utf8'));
    body.push(data);
  });
  
  // response.statusCode = 404 to tell the client resource wasn't found
  // request.on('data', function(chunk) {
  //   console.log('chunk',chunk);
  // });

  // ---------------------------------------
  // The outgoing status.
  var statusCode = 200;

  if (request.method === 'POST') {
    // results.push();
    statusCode = 201;
  }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);
  
  // *******WRITING THE RESPONSE SCHTUFF********
  response.on('error', function(err) {
    console.error(err);
  });
  
  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    results: initial
  };
  
  response.end(JSON.stringify(responseBody));
  console.log('request.method: ', request.method);
  console.log('responsebody: ', responseBody);
  
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World!asdasdasdsad');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports = requestHandler;