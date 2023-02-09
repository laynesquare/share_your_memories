import { Box, CircularProgress } from '@mui/material';

const Loading = ({ type, slightTopMargin }) => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: type === 'big' ? 'translate(-50%,-50%)' : '',
        position: type === 'big' ? 'absolute' : '',
        display: 'flex',
        height: '100%',
        left: type === 'big' ? '50vw' : '',
        top: type === 'big' ? '50vh' : '',
        mt: slightTopMargin ? '1rem' : '',
      }}
    >
      <CircularProgress size={type === 'big' ? '2rem' : '2rem'} />
    </Box>
  );
};

export default Loading;
