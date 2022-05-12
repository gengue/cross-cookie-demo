const http = require("http"); // Import Node.js core module

function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}

const server = http.createServer(function (req, res) {
  //create web server
  if (req.url == "/") {
    //check the URL of the current request
    // set response header
    res.writeHead(200, { "Content-Type": "text/html" });
    // set response content
    res.write("<html><body><p>This is galapatours</p></body></html>");
    res.end();
  } else if (req.url == "/set-cookie") {
    // To Read a Cookie
    const cookies = parseCookies(req);
    console.log(cookies);

    const validTime = 3_600_000 * 24 * 30; // 30 days
    const expires = new Date(new Date().getTime() + validTime).toUTCString();
    // To Write a Cookie
    res.writeHead(200, {
      "Set-Cookie": `mycookie=test; expires=${expires};`,
      "Content-Type": `text/plain`,
    });
    console.log("setting cookie 2...");
    res.end(`Hello World\n`);
  } else res.end("Invalid Request!");
});

const PORT = 5002;
server.listen(PORT); //6 - listen for any incoming requests

console.log(`Node.js web server at port ${PORT} is running..`);
