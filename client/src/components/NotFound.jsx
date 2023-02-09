import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = ({ text, iconSize, fontWeight, textVariant }) => {
  return (
    <Box sx={{ textAlign: 'center', m: 'auto auto' }}>
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: iconSize ? iconSize : '10rem', textAlign: 'center' }}
      />
      <Typography
        variant={textVariant ? textVariant : 'h4'}
        sx={{ fontWeight: fontWeight ? '' : '' }}
      >
        {text ? text : '404 Page Not Found'}
      </Typography>
    </Box>
  );
};

export default NotFound;
