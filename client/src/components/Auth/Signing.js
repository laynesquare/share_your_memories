import { Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SIGNING } from '../../constants/actionTypes';

const Signing = () => {
  const isSigning = useSelector((state) => state.auth.authData);

  return (
    <Backdrop sx={{ ...style }} open={isSigning === SIGNING}>
      <CircularProgress />

      <Typography variant="BUTTON TEXT" sx={{ ...style.text }}>
        Loggin in or signing up. Might take 2 mins due to free hosting service
        ...
      </Typography>
    </Backdrop>
  );
};

const style = {
  flexDirection: 'column',
  minWidth: '360px',
  bgcolor: 'rgba(0, 0, 0, 0.82)',
  zIndex: 10,
  color: '#fff',
  p: '1rem',

  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    mt: '2rem',
  },
};

export default Signing;
