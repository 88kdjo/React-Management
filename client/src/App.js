import './App.css';

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, tableCellClasses, Paper, CircularProgress, AppBar, Box, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Menu = styled('div')(({ theme }) => ({
  marginTop: 15,
  marginBottom: 15,
  display: 'flex',
  justifyContent: 'center',
}));

const App = () => {

  const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
  const [customersData, setCustomersData] = useState('');
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const appStateReset = () => {
    setCustomersData('');
    setCompleted(0);
    setIsLoad(false);
    setSearchKeyword('');
  };

  const stateRefresh = () => {
    appStateReset();

    callApi()
      .then( (data) => setCustomersData(data))
      .catch( (err) => console.log(`[ERR] callApi: ${err}`));
  };

  const callApi = async () => {
    const response = await fetch('/api/customers', {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
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
      .catch( (err) => console.log(`[ERR] callApi: ${err}`));
  }, [isLoad]);

  const valueChangeHandler = (e) => { setSearchKeyword(e.currentTarget.value); };
  const filteredComponents = (data) => {
    data = data.filter( (c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });

    return data.map( (c) => {
      return (<Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
    });
  };

  return (
    <div style={{ marginLeft: 18, marginRight: 18 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              고객 관리 시스템
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색하기"
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={searchKeyword}
                onChange={valueChangeHandler}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu>
        <CustomerAdd stateRefresh={stateRefresh} />
      </Menu>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: '1080px' }}>
          <TableHead>
            <TableRow>
              {
                cellList.map( (c) => {
                  return <StyledTableCell>{c}</StyledTableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customersData ? filteredComponents(customersData) :
              <TableRow>
                <TableCell colSpan='6' align='center'>
                  <CircularProgress color='success' variant='indeterminate' value={completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;