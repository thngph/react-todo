import { Add } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import CategoryPopup from '../new-category';
import { CategoryData } from '../new-category/components/CategoryForm';
import CategoryItem from './components/CategoryItem';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';

export const CategoryList = () => {
  const [editingCategory, setEditingCategory] = React.useState<CategoryData | null>(null);

  const { data: { docs: categories = [] } = {}, isLoading } = useCategoriesQuery();

  if (isLoading) {
    return (
      <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Grid key={index} size={2}>
              <Stack
                sx={(theme) => ({
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  width: theme.spacing(10),
                  height: theme.spacing(10),
                  borderRadius: 8
                })}
              ></Stack>
              <Typography></Typography>
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
      {categories?.length &&
        categories.map((category) => (
          <Grid key={category.id} size={2}>
            <CategoryItem category={category} onClick={() => setEditingCategory(category)} />
          </Grid>
        ))}

      <Grid
        size={2}
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          setEditingCategory({
            color: '#6573c3',
            icon: '',
            name: ''
          })
        }
      >
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

      <CategoryPopup
        open={Boolean(editingCategory)}
        onClose={() => setEditingCategory(null)}
        defaultValues={editingCategory || undefined}
      ></CategoryPopup>
    </Grid>
  );
};

export default CategoryList;
