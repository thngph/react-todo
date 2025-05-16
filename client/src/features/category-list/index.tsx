import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, Grid, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { QUERY_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance, fetcher } from '../../libs/query-client';
import { Category } from '../../types/Category';
import { Paginated } from '../../types/Paginated';
import { Todo } from '../../types/Todo';
import CategoryPopup from '../new-category';
import { CategoryData } from '../new-category/components/CategoryForm';
import CategoryItem from './components/CategoryItem';
import CategorySkeleton from './components/CategorySkeleton';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';

const defaultValues = {
  color: '#6573c3',
  icon: '',
  name: ''
};
const deleteCategory = async ({ id }: Pick<Category, 'id'>) => axiosInstance.delete(`${PATH.CATEGORY}/${id}`);
export const CategoryList = () => {
  const [editingCategory, setEditingCategory] = React.useState<CategoryData | null>(null);
  const [deletingCategory, setDeletingCategory] = React.useState<Category | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
      setDeletingCategory(null);
    }
  });

  const validationParams = { categoryId: [deletingCategory?.id] };

  const { refetch } = useQuery({
    queryKey: [QUERY_KEY.TODOS, validationParams],
    queryFn: fetcher<Paginated<Todo>>(PATH.TODO, { params: { ...validationParams } }),
    enabled: false
  });

  const handleDelete = async () => {
    if (mutation.isPending || !deletingCategory) return;
    const { data: { docs } = {} } = await refetch();
    if (docs && docs?.length > 0) {
      toast.error('HIIIIIIIIIIII');
      return;
    }
    mutation.mutate({ id: deletingCategory.id });
  };

  const { data: { docs: categories = [] } = {}, isLoading } = useCategoriesQuery();

  if (isLoading) return <CategorySkeleton />;

  return (
    <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
      {categories?.length &&
        categories.map((category) => (
          <Grid key={category.id} size={2}>
            <CategoryItem
              category={category}
              onClick={() => setEditingCategory(category)}
              onDelete={() => {
                setDeletingCategory(category);
              }}
            />
          </Grid>
        ))}

      <Grid size={2} sx={{ cursor: 'pointer' }} onClick={() => setEditingCategory(defaultValues)}>
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

      <Dialog maxWidth="xs" fullWidth open={Boolean(deletingCategory)} onClose={() => setDeletingCategory(null)}>
        <DialogContent>
          <Typography>
            Are you sure deleting category <b>{deletingCategory?.name}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDeletingCategory(null)}>
            Close
          </Button>
          <Button loading={mutation.isPending} variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CategoryList;
