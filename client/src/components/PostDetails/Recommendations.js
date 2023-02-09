import { Box, Typography, Chip, Stack, Grow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CLEANUP_RECOMMEND_VIDS } from '../../constants/actionTypes';
import { useEffect, useState } from 'react';
import { getRecommendedVids } from '../../actions/recommendations';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import decodeAndCutString from '../../utils/decodeAndCutString';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotFound from '../NotFound';
import Loading from '../Loading';
import recVid from './recVid.json';
import moment from 'moment';

const Recommendations = ({ title, tags }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedChip, setSelectedChip] = useState(-1);

  const handleYoutubeSearchByChip = (idx, tag) => {
    setSelectedChip(idx);
    dispatch(getRecommendedVids(tag));
  };

  useEffect(() => {
    dispatch(getRecommendedVids(title));
    return () => dispatch({ type: CLEANUP_RECOMMEND_VIDS });
  }, [location]);

  return (
    <>
      <Box>
        <Stack sx={{ ...recStyle.chipStack }}>
          <ChipForSearch
            sequence={-1}
            chipTitle={title}
            conditionalStyle={-1}
            selectedChip={selectedChip}
            onClickCallback={() => handleYoutubeSearchByChip(-1, title)}
          />
          {tags?.length && (
            <>
              {tags.map((tag, idx) => (
                <ChipForSearch
                  key={idx}
                  sequence={idx}
                  selectedChip={selectedChip}
                  chipTitle={`${tag}`}
                  onClickCallback={() => handleYoutubeSearchByChip(idx, tag)}
                />
              ))}
            </>
          )}
        </Stack>
      </Box>

      <Box sx={{ ...recStyle.videoStack }}>
        <Videos />
      </Box>
    </>
  );
};

const Videos = () => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);
  const { isLoading, vids } = useSelector((state) => state.recommendations);
  const mediumSizedWindow = useMediaQuery(theme.breakpoints.down('lg'));

  if (isLoading) return <Loading type="small" slightTopMargin />;

  if (!vids.length > 0)
    return <NotFound text="No videos or quota limit met." textVariant="h6" />;

  return (
    <>
      {vids?.map((item, idx) => (
        <Grow in key={idx}>
          <Box
            key={idx}
            onMouseEnter={() => setIsHover(idx)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() =>
              handleClickRecommendation(item.id.videoId, item.snippet.channelId)
            }
            sx={{ ...recStyle.perVideoBox.mostOuter }}
          >
            <Box sx={{ ...recStyle.perVideoBox.leftColumn }}>
              <Box sx={{ ...recStyle.imgBox(isHover, idx) }}>
                <Box
                  component="img"
                  src={item.snippet.thumbnails.medium.url}
                  sx={{ ...recStyle.imgPerSe(isHover, idx) }}
                ></Box>
              </Box>
            </Box>

            <Box sx={{ ...recStyle.perVideoBox.rightColumn }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {decodeAndCutString(item.snippet.title, 50, mediumSizedWindow)}
              </Typography>
              <Typography variant="body2">
                {decodeAndCutString(
                  item.snippet.channelTitle,
                  30,
                  mediumSizedWindow
                )}
              </Typography>
              <Typography variant="body2">
                {moment(item.snippet.publishedAt).fromNow()}
              </Typography>
            </Box>
          </Box>
        </Grow>
      ))}
    </>
  );
};

const handleClickRecommendation = (video, channel) => {
  let { base, videoId, bridge, channelId } = {
    base: 'https://www.youtube.com/watch?v=',
    videoId: video,
    bridge: '&ab_channel=',
    channelTitle: channel,
  };

  window.open(
    base + videoId + bridge + channelId,
    '_blank',
    'noopener,noreferrer'
  );
};

const ChipForSearch = ({
  onClickCallback,
  selectedChip,
  chipTitle,
  sequence,
}) => {
  return (
    <Chip
      idx={sequence}
      size="medium"
      label={chipTitle}
      clickable={true}
      variant={selectedChip === sequence ? 'filled' : 'outlined'}
      color={selectedChip === sequence ? 'primary' : 'default'}
      onClick={onClickCallback}
      sx={{ ...recStyle.chipStack.chip }}
    />
  );
};

const recStyle = {
  chipStack: {
    justifyContent: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    bgcolor: 'purle',
    gap: '1rem',
    mb: '1rem',

    chip: {
      fontWeight: 'bold',
      flexGrow: '1',
      overflow: 'hidden',
    },
  },

  videoStack: {
    flexDirection: 'column',
    display: 'flex',
    gap: { xs: '2rem', sm: '6px' },
  },

  perVideoBox: {
    mostOuter: {
      flexWrap: { xs: 'wrap', sm: 'nowrap' },
      display: 'flex',
      cursor: 'pointer',
      gap: '8px',
    },

    leftColumn: {
      flex: { xs: '0 0 100%', sm: '0 0 300px', lg: '0 0 168px' },
      position: 'relative',
    },

    rightColumn: {
      flexGrow: '1',
      flexShrink: '1',
      flexWrap: 'nowrap',
    },
  },

  imgBox(isHover, idx) {
    return {
      display: 'flex',

      '&::after': {
        whiteSpace: 'nowrap',
        transition: 'ease-in-out 0.3s',
        fontWeight: 'bold',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        fontSize: '1rem',
        content: "'WATCH'",
        opacity: isHover === idx ? '100%' : '0%',
        zIndex: '2',
        left: '50%',
        top: '50%',
      },

      '&::before': {
        transition: 'ease-in-out 0.1s',
        position: 'absolute',
        bgcolor: 'primary.main',
        content: "''",
        height: '100%',
        zIndex: '3',
        width: isHover === idx ? '3px' : '0px',
        left: '0',
      },
    };
  },

  imgPerSe(isHover, idx) {
    return {
      aspectRatio: '16/9',
      transition: 'ease-in-out 0.3s',
      filter: isHover === idx ? 'brightness(10%)' : '',
      width: '100%',
    };
  },
};

export default Recommendations;
