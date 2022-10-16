import { useDrop } from 'react-dnd';
import { Box } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const outerBoxStyle = {
  width: '100%',
  height: '100%',
  icon: {
    width: '100%',
    height: '100%',
  },
};

const DropDustbin = ({ posts, isLoading }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: posts.map((post) => post._id),
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box ref={drop} sx={{ ...outerBoxStyle }}>
      {canDrop ? (
        <DeleteOutlineIcon
          sx={{ ...outerBoxStyle.icon, color: isOver ? 'primary.main' : '' }}
        />
      ) : (
        <DeleteIcon
          sx={{ ...outerBoxStyle.icon, color: isOver ? 'primary.main' : '' }}
        />
      )}
    </Box>
  );
};

export default DropDustbin;
