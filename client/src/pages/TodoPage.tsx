import { Add } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FilterBar from '../components/layout/FilterBar';
import Search from '../components/layout/SearchBar';
import { Dialog } from '../components/ui/Dialog';
import { QUERY_KEY } from '../constants/key';
import { PATH } from '../constants/path';
import TodoPopup, { TodoData } from '../features/new-todo';
import TodoList from '../features/todo-list';
import { axiosInstance } from '../libs/query-client';
import { Todo } from '../types/Todo';

const deleteTodo = async ({ id }: Pick<Todo, 'id'>) => axiosInstance.delete(`${PATH.TODO}/${id}`);
const defaultValues: TodoData = {
  title: ''
};
export const TodoPage = () => {
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [editingTodo, setEditingTodo] = useState<TodoData | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
      setDeletingTodo(null);
    },
    onError: () => toast.error('Delete todo failed')
  });

  const handleDelete = () => {
    if (mutation.isPending || !deletingTodo) return;

    mutation.mutate({ id: deletingTodo.id });
  };

  return (
    <>
      <TodoPopup
        open={Boolean(editingTodo)}
        onClose={() => setEditingTodo(null)}
        defaultValues={editingTodo || undefined}
      />

      <Dialog maxWidth="xs" fullWidth open={Boolean(deletingTodo)} onClose={() => setDeletingTodo(null)}>
        <DialogContent>
          <Typography>
            Are you sure deleting <b>{deletingTodo?.title}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDeletingTodo(null)}>
            Close
          </Button>
          <Button loading={mutation.isPending} variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={3} padding={2} alignItems="center" justifyContent="space-between">
        <Stack width={1} spacing={1}>
          <Search />
          <Stack width={1} px={1} justifyContent="space-between" direction="row">
            <FilterBar />
            {/* Floating Add Button */}
            <IconButton
              sx={{
                padding: 1,
                color: (theme) => theme.palette.primary.main
              }}
              onClick={() => setEditingTodo(defaultValues)}
            >
              <Add />
            </IconButton>
          </Stack>
        </Stack>

        <TodoList handleOpenForm={setEditingTodo} onDelete={setDeletingTodo} />
      </Stack>
    </>
  );
};

export default TodoPage;
