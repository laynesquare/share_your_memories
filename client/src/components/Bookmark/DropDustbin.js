import { useDrop } from 'react-dnd';
import { Box } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const DropDustbin = ({ posts, isLoading }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: posts.map((post) => post._id),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box ref={drop}>
      {canDrop ? (
        <DeleteOutlineIcon sx={{ ...outerBoxStyle.icon(isOver) }} />
      ) : (
        <DeleteIcon sx={{ ...outerBoxStyle.icon(isOver) }} />
      )}
    </Box>
  );
};

const outerBoxStyle = {
  icon(isOver) {
    return {
      height: '100%',
      width: '100%',
      color: isOver ? 'primary.main' : '',
    };
  },
};

export default DropDustbin;
