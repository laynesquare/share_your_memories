import { Box, Typography, Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendedVids } from '../../actions/recommendations';
import { useLocation } from 'react-router-dom';
import { CLEANUP_RECOMMEND_VIDS } from '../../constants/actionTypes';
import recVid from './recVid.json';
import moment from 'moment';
import Loading from '../Loading';
import NotFound from '../NotFound';

const recStyle = {
  chipStack: {
    flexWrap: 'wrap',
    bgcolor: 'purle',
    p: '0 0 0rem 0',
    flexDirection: 'row',
    justifyContent: 'stretch',

    chip: {
      fontWeight: 'bold',
      m: '0rem 1rem 1rem 0',
      flexGrow: '1',
      overflow: 'hidden',
    },
  },

  perVideoBox: {
    mostOuter: {
      display: 'flex',
      cursor: 'pointer',
      mt: '0.5rem',
    },

    leftColumn: {
      flex: '0 0 260px',
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
      fontSize: '20px',
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
      width: '250px',
      maxHeight: '140.63px',
    },
  },
};

const ChipForSearch = ({
  chipTitle,
  onClickCallback,
  nowSelected,
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

const Recommendations = ({ title, tags }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  let { isLoading, vids } = useSelector((state) => state.recommendations);
  const [isHover, setIsHover] = useState(false);
  const [selectedChip, setSelectedChip] = useState(-1);

  const handleYoutubeSearchByChip = (idx, tag) => {
    setSelectedChip(idx);
    dispatch(getRecommendedVids(tag));
  };

  console.log(vids);

  const decodeAndCutString = (type, text) => {
    let cleanerText = text;
    if (type === 'title' && text.length > 54) {
      cleanerText = text.substring(0, 54) + ' ...';
    } else if (type === 'channel' && text.length > 39) {
      cleanerText = text.substring(0, 39) + ' ...';
    }
    cleanerText = cleanerText.replace(/&#39;/g, "'");
    return cleanerText;
  };

  useEffect(() => {
    dispatch(getRecommendedVids(title));
    return () => dispatch({ type: CLEANUP_RECOMMEND_VIDS });
  }, [location]);

  return (
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

      <Box>
        {isLoading ? (
          <Loading type="small" slightTopMargin />
        ) : (
          <>
            {/* do we have any videos from the api search, if no then its either
            actual no results or quota limit exceeded */}
            {/* {!recVid.items.length > 0 ?  */}
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
                            filter: isHover === idx ? 'brightness(50%)' : '',
                          }}
                        ></Box>
                      </Box>
                    </Box>

                    <Box sx={{ ...recStyle.perVideoBox.rightColumn }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {decodeAndCutString('title', item.snippet.title)}
                      </Typography>
                      <Typography>
                        {item.snippet.channelTitle > 40
                          ? item.snippet.channelTitle.substring(0, 39)
                          : item.snippet.channelTitle}
                      </Typography>
                      <Typography>
                        {moment(item.snippet.publishedAt).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Recommendations;
