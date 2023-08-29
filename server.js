const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (request, response) => {
  response.send([
    {
      'id': 1,
      'image': 'https://via.placeholder.com/64/64/1',
      'name': '홍길동',
      'birthday': '901122',
      'gender': '남자',
      'job': '대학생'
    },
    {
      'id': 2,
      'image': 'https://via.placeholder.com/64/64/2',
      'name': '김우리',
      'birthday': '990304',
      'gender': '여자',
      'job': '대학생'
    },
    {
      'id': 3,
      'image': 'https://via.placeholder.com/64/64/3',
      'name': '주하나',
      'birthday': '001011',
      'gender': '여자',
      'job': '대학생'
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));