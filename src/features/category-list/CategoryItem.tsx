import { Box, Typography } from '@mui/material';
import { Category } from '../../types/Category';

type CategoryItemProps = { category: Category };

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props;

  return (
    <Box>
      <Typography>{category.name}</Typography>
    </Box>
  );
};
export default CategoryItem;
