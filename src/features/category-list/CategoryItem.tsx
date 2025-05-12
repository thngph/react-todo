import { Box, Stack, Typography } from '@mui/material';
import { Category } from '../../types/Category';

type CategoryItemProps = { category: Category };

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props;

  return (
    <Stack alignItems="center" sx={{ cursor: 'pointer' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={8}
        sx={(theme) => ({
          bgcolor: category.color,
          width: theme.spacing(12),
          height: theme.spacing(12)
        })}
      >
        <Box component="img" src={category.icon} sx={{ width: '50%' }} />
      </Box>
      <Typography>{category.name}</Typography>
    </Stack>
  );
};
export default CategoryItem;
