import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = ({ text, iconSize, fontWeight, textVariant }) => {
  return (
    <Box sx={{ textAlign: 'center', m: 'auto auto' }}>
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: iconSize, textAlign: 'center' }}
      />
      <Typography
        variant={textVariant}
        sx={{ fontWeight: fontWeight ? '' : '' }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default NotFound;
