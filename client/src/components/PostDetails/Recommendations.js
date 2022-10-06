import { Box, Typography, Chip, Stack, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendedVids } from '../../actions/recommendations';
import { useLocation } from 'react-router-dom';
import recVid from './recVid.json';
import moment from 'moment';

const Recommendations = ({ title, tags }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, vids } = useSelector((state) => state.recommendations);
  const [isHover, setIsHover] = useState(false);
  const [youtubeSearchByTag, setYoutubeSearchByTag] = useState('All');
  const handleYoutubeSearchByChip = (tag) => {
    setYoutubeSearchByTag(tag);
    dispatch(getRecommendedVids(tag));
  };

  console.log(isLoading, vids, 'log repeated?');

  useEffect(() => {
    dispatch(getRecommendedVids(title));
  }, [location]);

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

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '3900px',
        }}
      >
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'green' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {/* You might also like... */}
      </Typography>

      <Box>
        <Stack
          direction="row"
          justifyContent="stretch"
          sx={{ flexWrap: 'wrap', bgcolor: 'purle', p: '0 0 0rem 0' }}
        >
          <Chip
            size="medium"
            label={'All'}
            sx={{
              fontWeight: 'bold',
              m: '0rem 1rem 1rem 0',
              flexGrow: '1',
            }}
            variant={youtubeSearchByTag === 'All' ? 'filled' : 'outlined'}
            color={youtubeSearchByTag === 'All' ? 'primary' : 'default'}
            onClick={() => {
              setYoutubeSearchByTag('All');
            }}
          />
          {Array.isArray(tags) > 0 && (
            <>
              {tags.map((tag) => (
                <Chip
                  clickable={true}
                  size="large"
                  label={`${tag}`}
                  variant={youtubeSearchByTag === tag ? 'filled' : 'outlined'}
                  color={youtubeSearchByTag === tag ? 'primary' : 'default'}
                  sx={{
                    fontWeight: 'bold',
                    m: '0rem 1rem 1rem 0',

                    flexGrow: '1',
                  }}
                  onClick={() => {
                    handleYoutubeSearchByChip(tag);
                  }}
                />
              ))}
            </>
          )}
        </Stack>
      </Box>
      {/* </Grid> */}
      {/* </Box> */}

      <Box sx={{}}>
        {!isLoading &&
          vids?.map((item, idx) => (
            <Box
              onMouseEnter={() => {
                // handleOnMouseEnterLeave(idx);
                setIsHover(idx);
              }}
              onMouseLeave={() => {
                // handleOnMouseEnterLeave(idx);
                setIsHover(false);
              }}
              onClick={() => {
                handleClickRecommendation(
                  item.id.videoId,
                  item.snippet.channelId
                );
              }}
              sx={{
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  // bgcolor: 'red',
                  flex: '0 0 260px',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    '&::after': {
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      whiteSpace: 'nowrap',
                      content: "'WATCH'",
                      opacity: isHover === idx ? '100%' : '0%',
                      // bgcolor: 'primary.main',
                      position: 'absolute',
                      transition: 'ease-in-out 0.3s',
                      zIndex: '2',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    },

                    '&::before': {
                      left: '0',
                      bottom: '6px',
                      width: isHover === idx ? '3px' : '0px',
                      height: '140.63px',
                      content: "''",
                      bgcolor: 'primary.main',
                      position: 'absolute',
                      transition: 'ease-in-out 0.1s',
                      zIndex: '1',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.snippet.thumbnails.medium.url}
                    sx={{
                      transition: 'ease-in-out 0.3s',
                      width: '250px',
                      height: '100%',
                      filter: isHover === idx ? 'brightness(50%)' : '',
                    }}
                  ></Box>
                </Box>
              </Box>

              <Box
                sx={{
                  // bgcolor: 'orange',
                  flexGrow: '1',
                  flexShrink: '1',

                  flexWrap: 'nowrap',
                }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {item.snippet.title}
                </Typography>
                <Typography>
                  {item.snippet.channelTitle} {' * '}
                  {moment(item.snippet.publishedAt).fromNow()}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Recommendations;
