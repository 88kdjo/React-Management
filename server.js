const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const config = JSON.parse(data);

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
  database: config.database
});

connection.connect();

app.get('/api/customers', (request, response) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      response.send(rows);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));