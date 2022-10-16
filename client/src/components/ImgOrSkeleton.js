import { Avatar, Skeleton } from '@mui/material';

const ImgOrSkeleton = ({
  isImgLoaded,
  setIsImgLoaded,
  skeletonStyle,
  imgStyle,
  selectedFile,
}) => {
  return (
    <>
      {isImgLoaded ? null : (
        <Skeleton variant="rectangular" sx={skeletonStyle}></Skeleton>
      )}
      <Avatar
        src={selectedFile || 'https://source.unsplash.com/random'}
        onLoad={() => setIsImgLoaded(true)}
        sx={imgStyle}
      ></Avatar>
    </>
  );
};

export default ImgOrSkeleton;
