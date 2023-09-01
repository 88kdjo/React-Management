import { useState } from 'react';
import axios from 'axios';

const CustomerAdd = (props) => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const customerAddStateReset = () => {
    setFile(null);
    setFileName("");
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
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
        console.log(`[INFO] ${response.statusText}(${response.status})`);
        props.stateRefresh();
      })
      .catch( (err) => {
        console.log(`[ERR] formSubmitHandler: ${err}`);
      });
      
      customerAddStateReset();
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <h1>고객 추가</h1>
      프로필 이미지: <input type="file" name="file" accept="image/*" value={fileName} onChange={setFileHandler}/><br/>
      이름: <input type="text" name="userName" value={userName} onChange={setUserNameHandler}/><br/>
      생년월일: <input type="text" name="birthday" value={birthday} onChange={setBirthdayHandler}/><br/>
      성별: <input type="text" name="gender" value={gender} onChange={setGenderHandler}/><br/>
      직업: <input type="text" name="job" value={job} onChange={setJobHandler}/><br/>
      <button type="submit">추가하기</button>
    </form>
  );

}

export default CustomerAdd;