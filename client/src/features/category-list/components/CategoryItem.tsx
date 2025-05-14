import { Box, Stack, Typography } from '@mui/material';
import { Category } from '../../../types/Category';

type CategoryItemProps = { category: Category };

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props;

  return (
    <Stack sx={{ overflow: 'hidden', flexGrow: 1 }} title={category.name}>
      <Stack
        sx={(theme) => ({
          alignItems: 'center',
          justifyContent: 'center',

          bgcolor: category.color,
          borderRadius: 8,

          width: theme.spacing(10),
          height: theme.spacing(10)
        })}
      >
        <Box component="img" src={category.icon} sx={{ width: '50%' }} />
      </Stack>
      <Typography align="center" noWrap>
        {category.name}
      </Typography>
    </Stack>
  );
};
export default CategoryItem;
