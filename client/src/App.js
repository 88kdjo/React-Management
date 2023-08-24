import './App.css';

import Customer from './components/Customer';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const customers = [
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
]

const App = () => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{minWidth: '1080px'}}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            customers.map( (row) => {
              return (
                <Customer
                  key={row.id}
                  id={row.id}
                  image={row.image}
                  name={row.name}
                  birthday={row.birthday}
                  gender={row.gender}
                  job={row.job}
                />
              );
            })
          };
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;