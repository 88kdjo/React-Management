const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/image', express.static('./upload'));

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

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'upload');
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/customers', upload.single('image'), (request, response) => {
  const sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  const image = `http://localhost:${port}/image/${request.file.filename}`;
  const name = request.body.name;
  const birthday = request.body.birthday;
  const gender = request.body.gender;
  const job = request.body.job;
  const params = [image, name, birthday, gender, job];

  connection.query(sql, params, (err, rows, fields) => {
    response.send(rows);
  });

});

app.listen(port, () => {
  const dir = "./upload";
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
  console.log(`[INFO] Listening on port ${port}`);
});