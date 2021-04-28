const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const opts = {
  key: fs.readFileSync("/home/stijn/keys/privatekey.key"),
  cert: fs.readFileSync("/home/stijn/keys/ss_cert.crt"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync("/home/stijn/keys/ss_cert.crt")],
};

router.get("/pdata1.json", validateCertificateClientOne, (req, res) => {
  res.send({ name: "bulbasaur", color: "green" });
});

router.get("/pdata2.json", validateCertificateClientTwo, (req, res) => {
  res.send({ name: "charmander", color: "orange" });
});

function validateCertificateClientTwo(req, res, nex) {
  const cert = req.socket.getPeerCertificate();

  if (req.client.authorized && cert.subject.CN == "client02.local") {
    nex();
  } else if (cert.subject) {
    res
      .sendStatus(403)
      .send(
        "Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here."
      );
  } else {
    res
      .status(401)
      .send(`Sorry, but you need to provide a client certificate to continue.`);
  }
}

function validateCertificateClientOne(req, res, nex) {
  const cert = req.socket.getPeerCertificate();

  if (req.client.authorized && cert.subject.CN == "client01.local") {
    nex();
  } else if (cert.subject) {
    res
      .sendStatus(403)
      .send(
        "Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here."
      );
  } else {
    res
      .status(401)
      .send(`Sorry, but you need to provide a client certificate to continue.`);
  }
}

module.exports = router;
