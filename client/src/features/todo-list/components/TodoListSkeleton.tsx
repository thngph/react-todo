import { Skeleton, Stack } from '@mui/material';
import { DEFAULT } from '../../../constants/default';

export const TodoListSkeleton = () => {
  return (
    <Stack spacing={1} width={1}>
      {Array(DEFAULT.PAGE_LIMIT)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            variant="rectangular"
            key={index}
            sx={(theme) => ({
              padding: theme.spacing(3.75, 2),
              borderRadius: 3,
              width: 1
            })}
          ></Skeleton>
        ))}
    </Stack>
  );
};

export default TodoListSkeleton;
