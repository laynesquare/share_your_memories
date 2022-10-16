import { Box, CircularProgress } from '@mui/material';

const Loading = ({ type, slightTopMargin }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: type === 'big' ? 'absolute' : '',
          top: type === 'big' ? '50vh' : '',
          left: type === 'big' ? '50vw' : '',
          transform: type === 'big' ? 'translate(-50%,-50%)' : '',
          mt: slightTopMargin ? '1rem' : '',
        }}
      >
        <CircularProgress size={type === 'big' ? '3rem' : '2rem'} />
      </Box>
    </>
  );
};

export default Loading;
