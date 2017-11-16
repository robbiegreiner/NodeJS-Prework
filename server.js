const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (newMessage, response) => {
  messages.push(newMessage);
  response.writeHead(201, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

let messages = [
  { 'id': 1, 'user': 'MCA', 'message': 'whatcha whatcha all about'},
  { 'id': 2, 'user': 'adrock', 'message': 'check check check it out'},
  { 'id': 3, 'user': 'Mike D', 'message': 'witcha badself'}
]

// Q: What type of information is included in the header of a request?
// A: Information telling the server how to handle the data requested

// Q: What are the major RESTful methods and what do each of them do?
// GET: read data from the server
// POST: gives new data to the server
// PUT: update/replace a chunk of data
// PATCH: updates/modify a chunk of data
// DELETE: deletes a chunk of data


//Q: What is Node?
//A: Node is a server framework using javascript
