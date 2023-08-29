import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import './App.css';

import Customer from './components/Customer';

const App = () => {

  const [customersData, setCustomersData] = useState([]);

  const callApi = async () => {
    const response = await fetch('/api/customers', {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });

    const body = await response.json();

    return body;
  };

  useEffect( () => {
    callApi().then( (data) => setCustomersData(data));
  }, []);

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
            customersData ? customersData.map( (row) => {
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
            }) : "No data"
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;