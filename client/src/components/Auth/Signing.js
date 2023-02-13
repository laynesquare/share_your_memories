import { Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SIGNING } from '../../constants/actionTypes';

const Signing = () => {
  const isSigning = useSelector((state) => state.auth.authData);

  return (
    <Backdrop sx={{ ...style }} open={isSigning === SIGNING}>
      <CircularProgress />
      <br />
      <Typography variant="BUTTON TEXT" sx={{ fontWeight: 'bold' }}>
        Loggin in or signing up. Might take 2 mins due to free hosting service
        ...
      </Typography>
    </Backdrop>
  );
};

const style = {
  flexDirection: 'column',
  bgcolor: 'rgba(0, 0, 0, 0.82)',
  zIndex: 10,
  color: '#fff',
};
export default Signing;
