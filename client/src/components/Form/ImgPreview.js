import { Backdrop, Box } from '@material-ui/core';

const ImgPreview = ({ previewSrc, setPreviewSrc }) => {
  return (
    <Backdrop
      onClick={() => setPreviewSrc(false)}
      open={previewSrc}
      sx={{ ...style.backdrop }}
    >
      <Box component={'img'} src={previewSrc} sx={{ ...style.img }}></Box>
    </Backdrop>
  );
};

const style = {
  backdrop: { zIndex: 1201 },

  img: {
    borderRadius: '1rem',
    maxHeight: '70%',
    maxWidth: '70%',
  },
};

export default ImgPreview;
