import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import './App.css';

import Customer from './components/Customer';

const App = () => {

  const [customersData, setCustomersData] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const callApi = async () => {
    const response = await fetch('/api/customers', {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });

    const body = await response.json();

    setIsLoad(true);

    return body;
  };

  useEffect( () => {
    let complete = 0;
    let timer = setInterval( () => {
      (complete >= 100) ? complete = 0 : complete += 1;
      setCompleted(complete);
      if (isLoad) {
        clearInterval(timer);
      }
    }, 20);

    callApi()
      .then( (data) => setCustomersData(data))
      .catch( (err) => console.log(`[ERR] ${err}`));
  }, [isLoad]);

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
            })
            :
            <TableRow>
              <TableCell colSpan='6' align='center'>
                <CircularProgress color='success' variant='indeterminate' value={completed} />
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;