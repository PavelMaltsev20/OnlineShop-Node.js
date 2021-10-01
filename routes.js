const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write(`<head><title>Enter Message</title></head>`);
    res.write(`<body><h1>ITS WORKED and now i can change my text</h1><form action="/message" method="POST"><input type="text"
    name="myMessage"></input><button>Confirm</button></form></body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const msg = parseBody.split(`=`)[1];
      console.log(msg);
      fs.writeFile(`message.txt`, msg, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write(`<head>First page</head>`);
  res.write(`<body><h1>This it second page with this text</h1></body>`);
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
