import { Add } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import { Category } from '../../types/Category';
import { CategoryData } from '../new-category/components/CategoryForm';
import CategoryItem from './components/CategoryItem';
import CategorySkeleton from './components/CategorySkeleton';
import useCategoriesQuery from './hooks/useCategoriesQuery';

const defaultValues = {
  color: '#6573c3',
  icon: '',
  name: ''
};

type CategoryListProps = {
  onDelete: (category: Category) => void;
  onEdit: (category: CategoryData) => void;
};
export const CategoryList = (props: CategoryListProps) => {
  const { onDelete, onEdit } = props;
  const { data: { docs: categories = [] } = {}, isLoading } = useCategoriesQuery();

  if (isLoading) return <CategorySkeleton />;
  return (
    <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
      {categories?.length &&
        categories.map((category) => (
          <Grid key={category.id} size={2}>
            <CategoryItem
              category={category}
              onClick={() => onEdit(category)}
              onDelete={() => {
                onDelete(category);
              }}
            />
          </Grid>
        ))}

      <Grid size={2} sx={{ cursor: 'pointer' }} onClick={() => onEdit(defaultValues)}>
        <Stack alignItems="center">
          <Stack
            sx={(theme) => ({
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed',
              width: theme.spacing(10),
              height: theme.spacing(10),
              borderRadius: 8
            })}
          >
            <Add />
          </Stack>
          <Typography>Add new</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CategoryList;
