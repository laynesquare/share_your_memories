import { useState, forwardRef } from 'react';
import { Snackbar, Slide } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ImgPreview from './ImgPreview';

const ImgUpload = ({ setPostData, postData }) => {
  const [uploadState, setUploadState] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  const handling = (e) => {
    const file = e.target.files[0];
    if (file.size > 10485760) {
      e.target.value = null;
      setUploadState({ isFailed: true });
    } else {
      setUploadState({ isSuccess: true });
      base64Covert(file);
    }
  };

  const base64Covert = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPostData({ ...postData, selectedFile: reader.result });
      setPreviewSrc(reader.result);
    };
  };

  return (
    <>
      <input
        onChange={handling}
        multiple={false}
        accept="image/png, image/gif, image/jpeg"
        type="file"
      />
      <ImgPreview previewSrc={previewSrc} setPreviewSrc={setPreviewSrc} />
      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setUploadState(null)}
        open={uploadState?.isFailed}
      >
        <Alert severity="error" sx={{ fontWeight: 'bold' }}>
          Failed. Image is too big. It must be smaller than 10MB.
        </Alert>
      </Snackbar>

      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setUploadState(null)}
        open={uploadState?.isSuccess}
      >
        <Alert severity="success" sx={{ fontWeight: 'bold' }}>
          Success. Here is a preview.
        </Alert>
      </Snackbar>
    </>
  );
};

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ImgUpload;
