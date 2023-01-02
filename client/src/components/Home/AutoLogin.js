import { useState } from 'react';
import { Typography, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { signin } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const AutoLogin = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(!user);

  const handleClose = () => {
    setOpen(false);
    dispatch(
      signin({ email: 'johndoe@gmail.com', password: 'johndoe123' }, navigate)
    );
  };

  console.log(user, 'auto');

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ minWidth: '360px' }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: 'bold',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            <>You'll be auto-logged in as a test account</>
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: 'justify', color: 'text.primary' }}
          >
            To facilitate exploring the full functionality of the site, you'll
            be logged in as <b>John Doe</b> automatically,{' '}
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

export default AutoLogin;
