const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const opts = {
  key: fs.readFileSync("/home/stijn/keys/data/private_data.key"),
  cert: fs.readFileSync("/home/stijn/keys/data/ss_cert_data.crt"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync("/home/stijn/keys/data/ss_cert_data.crt")],
};

router.get("/pdata1.json", (req, res) => {
  const cert = req.socket.getPeerCertificate();
  if (req.client.authorized) {
    res.send(
      `Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`
    );
  } else if (cert.subject) {
    res
      .status(403)
      .send(
        `Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`
      );
  } else {
    res
      .status(401)
      .send(`Sorry, but you need to provide a client certificate to continue.`);
  }
});

router.get("/pdata2.json", (req, res) => {
  res.send("pdata2");
});

module.exports = router;
