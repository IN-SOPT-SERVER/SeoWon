const http = require("http");

const port = 3000;

http
  .createServer((req, res) => {
    res.write("<h1>IN SOPT SERVER!</h1>");
    res.end("<p>success</p>");
	  })
  .listen(port, () => {
    console.log(`${port} listening}`);
  });