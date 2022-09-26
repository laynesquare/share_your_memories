import { useDrop } from 'react-dnd';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const DropDustbin = ({ posts }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver, which }, drop] = useDrop(() => ({
    accept: posts.map((post) => post._id),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        width: '100px',
        height: '100px',
        backgroundColor: isOver ? 'red' : 'yellow',
      }}
    >
      DropDustbin
    </Box>
  );
};

export default DropDustbin;
