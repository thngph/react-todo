import { Box, Stack, Typography } from '@mui/material';
import { Category } from '../../types/Category';

type CategoryItemProps = { category: Category };

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props;

  return (
    <Box sx={{ flexGrow: 1, borderRadius: 3, width: 1 }}>
      <Stack justifyContent="center" alignItems="center" sx={{ bgcolor: category.color }}>
        <Box component="img" src={category.icon} sx={{ width: '60%' }} />
      </Stack>
      <Typography>{category.name}</Typography>
    </Box>
  );
};
export default CategoryItem;
