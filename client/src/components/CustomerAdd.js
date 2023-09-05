import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const CustomerAdd = (param) => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [open, setOpen] = useState(false);

  const customerAddStateReset = () => {
    setFile(null);
    setFileName('');
    setUserName('');
    setBirthday('');
    setGender('');
    setJob('');
  };

  const setFileHandler = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  }

  const setUserNameHandler = (e) => { setUserName(e.currentTarget.value); }
  const setBirthdayHandler = (e) => { setBirthday(e.currentTarget.value); }
  const setGenderHandler = (e) => { setGender(e.currentTarget.value); }
  const setJobHandler = (e) => { setJob(e.currentTarget.value); }

  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', userName);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('job', job);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    return axios.post(url, formData, config);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addCustomer()
      .then( (response) => {
        console.log(`[INFO] formSubmitHandler: ${response.statusText}(${response.status})`);
        param.stateRefresh();
      })
      .catch( (err) => {
        console.log(`[ERR] formSubmitHandler: ${err}`);
      });
      
      clickCloseHandler();
  }

  const clickOpenHandler = () => {
    setOpen(true);
  };

  const clickCloseHandler = () => {
    customerAddStateReset();
    setOpen(false);
  };

  return (
    <div>
      <Button color='primary' variant='contained' onClick={clickOpenHandler}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={clickCloseHandler}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input type='file' id='raised-button-file' accept='image/*' value={fileName} style={{display: 'none'}} onChange={setFileHandler}/>
          <label htmlFor='raised-button-file'>
            <Button color='primary' variant='contained' component='span' name='file'>
              {fileName === '' ? '프로필 이미지 선택' : fileName}
            </Button>
          </label>
          <br/><br/>
          <TextField label='이름' type='text' name='userName' value={userName} onChange={setUserNameHandler}/><br/><br/>
          <TextField label='생년월일' type='text' name='birthday' value={birthday} onChange={setBirthdayHandler}/><br/><br/>
          <TextField label='성별' type='text' name='gender' value={gender} onChange={setGenderHandler}/><br/><br/>
          <TextField label='직업' type='text' name='job' value={job} onChange={setJobHandler}/><br/><br/>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={formSubmitHandler}>추가</Button>
          <Button color='primary' variant='outlined' onClick={clickCloseHandler}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default CustomerAdd;