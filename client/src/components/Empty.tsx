import Box from '@mui/material/Box';
import emptyImage from '/empty.svg';

export const Empty = () => {
  return (
    <Box
      component="img"
      src={emptyImage}
      sx={{
        padding: 2,
        alignSelf: 'center',
        maxWidth: '300px',
        margin: '0 auto',
        flexGrow: 1
      }}
    />
  );
};
