import { Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { signin } from '../../actions/auth';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

const AutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [open, setOpen] = useState(!user);

  const handleClose = () => {
    setOpen(false);
    dispatch(signin(lazyLoginInfo, navigate));
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="Auto-logged-into-an-test-account"
        aria-describedby="you'll-be-logged-into-as-John-Doe-automatically"
        sx={{ minWidth: '360px' }}
      >
        <DialogTitle
          id="Auto-logged-into-an-test-account"
          sx={{ fontWeight: 'bold' }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', width: '100%' }}>
            <>You'll be auto-logged into a test account</>
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="you'll-be-logged-into-as-John-Doe-automatically"
            sx={{ textAlign: 'justify', color: 'text.primary' }}
          >
            To facilitate exploring the full functionality of the site, you'll
            be logged into as <b>John Doe</b> automatically,{' '}
            <b>since it's a try-it and shared one without exclusivity</b>.
            <br />
            <br />
            That being said, you can still log out and{' '}
            <b>create your own unique account</b> to separate yourself from
            other visitors.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ fontWeight: 'bold' }}
            autoFocus
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const lazyLoginInfo = { email: 'johndoe@gmail.com', password: 'johndoe123' };

export default AutoLogin;
