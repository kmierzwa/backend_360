const express = require("express");
const { Client } = require('pg')
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new Client({
  user: 'chuj',
  host: 'localhost',
  database: 'dupa',
  password: 'chuj',
  port: 5432,
})
client.connect()

app.get("/", (req, res) => {
  console.log(req.query)
  res.status(200).send('dupa')
})

app.get("/buttons", (req, res) => {

  client.query('SELECT * from surface_buttons', (err, query_results) => {
    if (err) {
      res.status(500).send({ message: "couldn't get data" });
      console.error("couldn't get data: ", err);
      client.end()
      return;
    }

    res.status(200).send(query_results.rows);
  })
});

app.listen(PORT, () =>
console.log(`Listening on port ${PORT}`)
);