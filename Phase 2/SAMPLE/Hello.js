const http = require('http')
const fs = require('fs')

const port = 3001

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('index.html', function (error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found')
        }
        else {
            res.write(data)
        }
        res.end()
            })
})

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error)
    }
    else {
        console.log('Server is listening on port ' + port)
    }
})





//http://localhost:3000/


/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3001; // Change the port number to 3001

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/
