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
  const theme = useTheme();
  const mediumSizedWindow = useMediaQuery(theme.breakpoints.down('lg'));
  let { isLoading, vids } = useSelector((state) => state.recommendations);
  const [isHover, setIsHover] = useState(false);
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
    <Grow in>
      <Box>
        <Box>
          <Stack sx={{ ...recStyle.chipStack }}>
            <ChipForSearch
              sequence={-1}
              chipTitle={title}
              conditionalStyle={-1}
              selectedChip={selectedChip}
              onClickCallback={() => handleYoutubeSearchByChip(-1, title)}
            />
            {Array.isArray(tags) > 0 && (
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
          {isLoading ? (
            <Loading type="small" slightTopMargin />
          ) : (
            <>
              {/* do we have any videos from the api search, if no then its either
            actual no results or quota limit exceeded */}
              {/* {!recVid.items.length > 0 ? ( */}
              {!vids.length > 0 ? (
                <NotFound
                  text="No videos or search quota limit exceeded."
                  iconSize="10rem"
                  textVariant="h6"
                />
              ) : (
                <>
                  {/* {recVid?.items.map((item, idx) => ( */}
                  {vids?.map((item, idx) => (
                    <Grow in>
                      <Box
                        key={idx}
                        onMouseEnter={() => setIsHover(idx)}
                        onMouseLeave={() => setIsHover(false)}
                        onClick={() =>
                          handleClickRecommendation(
                            item.id.videoId,
                            item.snippet.channelId
                          )
                        }
                        sx={{ ...recStyle.perVideoBox.mostOuter }}
                      >
                        <Box sx={{ ...recStyle.perVideoBox.leftColumn }}>
                          <Box
                            sx={{
                              display: 'flex',
                              '&::after': {
                                ...recStyle.imgBox['&::after'],
                                opacity: isHover === idx ? '100%' : '0%',
                              },

                              '&::before': {
                                ...recStyle.imgBox['&::before'],
                                width: isHover === idx ? '3px' : '0px',
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={item.snippet.thumbnails.medium.url}
                              sx={{
                                ...recStyle.imgBox.imgPerSe,
                                filter:
                                  isHover === idx ? 'brightness(10%)' : '',
                              }}
                            ></Box>
                          </Box>
                        </Box>

                        <Box sx={{ ...recStyle.perVideoBox.rightColumn }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {decodeAndCutString(
                              item.snippet.title,
                              50,
                              mediumSizedWindow
                            )}
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
              )}
            </>
          )}
        </Box>
      </Box>
    </Grow>
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
  chipTitle,
  onClickCallback,
  sequence,
  selectedChip,
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
    flexWrap: 'wrap',
    bgcolor: 'purle',
    flexDirection: 'row',
    justifyContent: 'stretch',
    gap: '1rem',
    mb: '1rem',

    chip: {
      fontWeight: 'bold',
      flexGrow: '1',
      overflow: 'hidden',
    },
  },

  videoStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '2rem', sm: '6px' },
  },

  perVideoBox: {
    mostOuter: {
      display: 'flex',
      cursor: 'pointer',
      gap: '8px',
      flexWrap: { xs: 'wrap', sm: 'nowrap' },
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

  imgBox: {
    '&::after': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      whiteSpace: 'nowrap',
      content: "'WATCH'",
      position: 'absolute',
      transition: 'ease-in-out 0.3s',
      zIndex: '2',
      fontSize: '1rem',
      fontWeight: 'bold',
    },

    '&::before': {
      left: '0',
      height: '100%',
      content: "''",
      bgcolor: 'primary.main',
      position: 'absolute',
      transition: 'ease-in-out 0.1s',
      zIndex: '3',
    },

    imgPerSe: {
      transition: 'ease-in-out 0.3s',
      width: '100%',
      aspectRatio: '16/9',
    },
  },
};

export default Recommendations;
