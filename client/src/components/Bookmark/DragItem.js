import { useDrag } from 'react-dnd';
import { Typography } from '@mui/material';
import { bookmarkPost } from '../../actions/posts';
import { useDispatch } from 'react-redux';

const DragItem = ({ post }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: post._id,
    end: (item, monitor) => {
      const itemDropped = monitor.didDrop();
      const whatItem = monitor.getItemType();
      if (itemDropped) dispatch(bookmarkPost(whatItem));
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <div ref={drag}>{post.title}</div>;
};

export default DragItem;
