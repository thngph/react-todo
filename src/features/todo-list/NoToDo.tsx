import Box from '@mui/material/Box';
import emptyImage from '../../assets/empty.svg';

export const NoToDo = () => {
  return (
    <Box
      component="img"
      src={emptyImage}
      sx={{
        alignSelf: 'center',
        maxWidth: '300px',
        margin: '0 auto',
        flexGrow: 1
      }}
    />
  );
};
