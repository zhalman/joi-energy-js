const express = require("express");
const bodyParser = require("body-parser");
const { readings } = require("./readings/readings");
const { readingsData } = require("./readings/readings.data");
const { read, store, readLastWeek } = require("./readings/readings-controller");
const { recommend, compare } = require("./price-plans/price-plans-controller");

const app = express();
app.use(bodyParser.json());

const { getReadings, setReadings, getLastWeekReadings } = readings(readingsData);

app.get("/readings/read/:smartMeterId", (req, res) => {
    res.send(read(getReadings, req));
});

app.get("/readings/read-last-week/:smartMeterId", (req, res) => {
    res.send(readLastWeek(getLastWeekReadings, req))
});

app.post("/readings/store", (req, res) => {
    res.send(store(setReadings, req));
});

app.get("/price-plans/recommend/:smartMeterId", (req, res) => {
    res.send(recommend(getReadings, req));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
    res.send(compare(getReadings, req));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
