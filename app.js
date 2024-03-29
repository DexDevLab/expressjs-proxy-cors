const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**
 * REQUISIÇÕES POST
 */
app.post("/", (req, res) => {
  const parsedHeaders = {};
  if ("headers" in req.query) {
    let reqHeaders = req.query.headers;
    reqHeaders = reqHeaders.replaceAll('"', "&quot;");
    reqHeaders = reqHeaders.replaceAll("'", '"');
    reqHeaders = JSON.parse(reqHeaders);
    Object.keys(req.headers).forEach((key) => {
      Object.assign(parsedHeaders, { [key]: req.headers[key] });
    });
    Object.keys(reqHeaders).forEach((key) => {
      Object.assign(parsedHeaders, { [key]: reqHeaders[key] });
    });
  }
  axios
    .post(req.query.url, req.body, {
      headers: { ...parsedHeaders },
    })
    .then((data) => {
      res.send(data.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

/**
 * REQUISIÇÕES GET
 */
app.get("/", (req, res) => {
  axios
    .get(req.query.url)
    .then((data) => {
      res.send(data.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.listen(process.env.PORT || 3000, () => console.log("CORS Server started"));
