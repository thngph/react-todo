import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { Dialog } from '../components/ui/Dialog';
import { QUERY_KEY } from '../constants/key';
import { PATH } from '../constants/path';
import CategoryList from '../features/category-list';
import CategoryPopup from '../features/new-category';
import { CategoryData } from '../features/new-category/components/CategoryForm';
import { axiosInstance, fetcher } from '../libs/query-client';
import { Category } from '../types/Category';
import { Paginated } from '../types/Paginated';
import { Todo } from '../types/Todo';

const deleteCategory = async ({ id }: Pick<Category, 'id'>) => axiosInstance.delete(`${PATH.CATEGORY}/${id}`);
export const CategoryPage = () => {
  const [editingCategory, setEditingCategory] = React.useState<CategoryData | null>(null);
  const [deletingCategory, setDeletingCategory] = React.useState<Category | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
      setDeletingCategory(null);
    },
    onError: () => toast.error('Delete category failed')
  });

  const validationParams = { categoryId: [deletingCategory?.id] };

  const { refetch: getUsingTodos } = useQuery({
    queryKey: [QUERY_KEY.TODOS, validationParams],
    queryFn: fetcher<Paginated<Todo>>(PATH.TODO, { params: { ...validationParams } }),
    enabled: false
  });

  const handleDelete = async () => {
    if (mutation.isPending || !deletingCategory) return;

    const { data: { docs: todos } = {} } = await getUsingTodos();
    if (todos && todos?.length > 0) {
      toast.error('This category is in use, please delete all todos in this category first');
      return;
    }

    mutation.mutate({ id: deletingCategory.id });
  };

  return (
    <>
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

      <CategoryList onDelete={setDeletingCategory} onEdit={setEditingCategory} />
    </>
  );
};

export default CategoryPage;
