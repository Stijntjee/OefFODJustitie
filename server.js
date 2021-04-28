require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const fs = require("fs");
const http = require("http");
const https = require("https");

const app = express();
const port = process.env.PORT;

const publicRouter = require("./routes/publicRouter");
const protectedRouter = require("./routes/protectedRouter");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/public", publicRouter);
app.use("/protected", protectedRouter);

const httpServer = http.createServer(app);

httpServer.listen(2000, () => {
  console.log("HTTP Server running on port " + 2000);
});

const privateKey = fs.readFileSync(
  "/home/stijn/keys/data/private_data.key",
  "utf8"
);
const certificate = fs.readFileSync(
  "/home/stijn/keys/data/ss_cert_data.crt",
  "utf8"
);
/*const ca = fs.readFileSync(
    "/etc/letsencrypt/live/litwick.be/chain.pem",
    "utf8"
  );*/

const credentials = {
  key: privateKey,
  cert: certificate,
};

const httpsServer = https.createServer(opts, app);
httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port " + port);
});

const opts = {
  key: fs.readFileSync("/home/stijn/keys/data/private_data.key"),
  cert: fs.readFileSync("/home/stijn/keys/data/ss_cert_data.crt"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync("/home/stijn/keys/data/ss_cert_data.crt")],
};
