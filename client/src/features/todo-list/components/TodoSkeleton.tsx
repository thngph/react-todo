import { Box, Stack } from '@mui/material';
import { DEFAULT } from '../../../constants/default';

export const TodoSkeleton = () => {
  return (
    <Stack spacing={1} width={1}>
      {Array(DEFAULT.PAGE_LIMIT)
        .fill(0)
        .map((_, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              bgcolor: 'grey.300',
              padding: theme.spacing(3.75, 2),
              borderRadius: 3,
              width: 1
            })}
          ></Box>
        ))}
    </Stack>
  );
};

export default TodoSkeleton;
