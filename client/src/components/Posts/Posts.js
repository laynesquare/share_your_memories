import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Loading from '../Loading';
import Post from './Post/Post';
import NotFound from '../NotFound';

const Posts = ({ setCurrentId, page }) => {
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) {
    if (Number(page) !== 1) return navigate(`/posts?page=${Number(page) - 1}`);
    return (
      <NotFound
        text="No posts ... yet. Be the first to post your memories."
        iconSize="15rem"
        textVariant="h5"
      />
    );
  }

  return isLoading ? (
    <Loading type="small" />
  ) : (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
