import footerBg from '../../assets/footerBg.svg';
import { Box, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StraightIcon from '@mui/icons-material/Straight';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import SpeedDial from '@mui/material/SpeedDial';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '150px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url('${footerBg}')`,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        p: '0 0 12px 0',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 'bold',
          letterSpacing: '1px',
        }}
      >
        © 2022 Layne Chen. All Rights Reserved.
      </Typography>
      <Box sx={{}}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          icon={<ExpandLessRoundedIcon />}
          onClick={() => alert()}
        ></SpeedDial>
      </Box>
    </Box>
  );
};

export default Footer;
