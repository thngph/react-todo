import Box from '@mui/material/Box';
import emptyImage from '../../assets/empty.svg';

export const NoToDo = () => {
  return (
    <Box
      component="img"
      src={emptyImage}
      sx={{
        padding: 2,
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        maxWidth: '300px',
        margin: '0 auto'
      }}
    />
  );
};
