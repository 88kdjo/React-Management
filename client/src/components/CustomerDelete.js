import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { useState } from 'react';

const CustomerDelete = (param) => {

  const [open, setOpen] = useState(false);

  const clickOpenHandler = () => { setOpen(true); };
  const clickCloseHandler = () => { setOpen(false); };

  const deleteCustomer = (id) => {
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE',
    });
    param.stateRefresh();
  };
  
  return (  
    <div>
      <Button color='secondary' variant='contained' onClick={clickOpenHandler}>삭제</Button>
      <Dialog open={open} onClose={clickCloseHandler}>
        <DialogTitle>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={ (e) => { deleteCustomer(param.id) }}>삭제</Button>
          <Button color='primary' variant='outlined' onClick={clickCloseHandler}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerDelete;