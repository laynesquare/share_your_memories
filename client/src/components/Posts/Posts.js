import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Loading from '../Loading';
import Post from './Post/Post';

const Posts = ({ setCurrentId, page }) => {
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) return <Loading type="small" />;

  if (!posts.length) return navigate(`/posts?page=${1}`);

  return (
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
