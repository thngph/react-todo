import { Box, Stack, Typography } from '@mui/material';
import { Category } from '../../../types/Category';

type CategoryItemProps = { category: Category };

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props;

  return (
    <Stack alignItems="center">
      <Stack
        sx={(theme) => ({
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: category.color,
          width: theme.spacing(10),
          height: theme.spacing(10),
          borderRadius: 8
        })}
      >
        <Box component="img" src={category.icon} sx={{ width: '50%' }} />
      </Stack>
      <Typography>{category.name}</Typography>
    </Stack>
  );
};
export default CategoryItem;
