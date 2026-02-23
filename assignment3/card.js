const http = require('http');
const fs = require('fs');
const card = fs.readFileSync('card.html');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    res.end(card);
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});