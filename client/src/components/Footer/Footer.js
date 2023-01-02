import { Box, Typography } from '@material-ui/core';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import SpeedDial from '@mui/material/SpeedDial';
import footerBg from '../../assets/footerBg.svg';

const Footer = () => {
  return (
    <Box sx={{ ...footerStyle.outerBox }}>
      <Typography variant="caption" sx={{ ...footerStyle.text }}>
        © 2022 Layne Chen. All Rights Reserved.
      </Typography>
      <Box sx={{ ...footerStyle.text }}>
        <SpeedDial
          ariaLabel="Navigate to top"
          sx={{ ...footerStyle.navigateToTop }}
          icon={<ExpandLessRoundedIcon />}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        ></SpeedDial>
      </Box>
    </Box>
  );
};

const footerStyle = {
  outerBox: {
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
  },

  text: {
    fontWeight: 'bold',
    letterSpacing: '1px',
  },

  navigateToTop: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
};

export default Footer;
