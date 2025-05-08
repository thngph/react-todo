import { Button, Dialog, DialogActions, DialogContent, Pagination, Stack, Typography } from '@mui/material';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Empty } from '../../components/Empty';
import Search from '../../components/layout/SearchBar';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance, fetcher } from '../../libs/query-client';
import { Paginated } from '../../types/Paginated';
import { ToDo } from '../../types/ToDo';
import ToDoItem from './ToDoItem';
import ToDoLoading from './ToDoLoading';

const deleteToDo = async ({ id }: Pick<ToDo, 'id'>) => axiosInstance.delete(`${PATH.TODO}/${id}`);
export const ToDoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [deletingTodo, setDeletingTodo] = useState<ToDo | null>(null);

  const keyword = searchParams.get(SEARCH_PARAM_KEY.KEYWORD) || '';
  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE)) || 1,
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT)) || DEFAULT.PAGE_LIMIT
  ];

  const params = {
    _limit: limit,
    _page: page,
    _sort: 'createdAt',
    _order: 'desc',
    ...(keyword && { title_like: keyword })
  };

  const handlePageChange = (page: number) => {
    searchParams.set(SEARCH_PARAM_KEY.PAGE, page.toString());
    setSearchParams(searchParams);
  };

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.TODOS, params],
    queryFn: fetcher<Paginated<ToDo>>(PATH.TODO, { params }),
    placeholderData: keepPreviousData
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
      setDeletingTodo(null);
    }
  });

  const handleDelete = () => {
    if (mutation.isPending || !deletingTodo) return;
    mutation.mutate({ id: deletingTodo.id });
  };

  const { docs: todos, pagination } = data || {};

  const totalPage = Math.ceil((pagination?._total || 0) / (pagination?._limit || DEFAULT.PAGE_LIMIT));

  React.useEffect(() => {
    if (totalPage < page) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [totalPage, page]);

  return (
    <Stack spacing={3} alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
      <Search />
      {isLoading ? (
        <ToDoLoading />
      ) : todos?.length ? (
        <>
          <Stack spacing={1} width={1} sx={{ width: 1, flexGrow: 1 }}>
            {todos.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onDelete={() => {
                  setDeletingTodo(todo);
                }}
              />
            ))}
          </Stack>
          {Number(pagination?._total) > limit && (
            <Pagination count={totalPage} page={page} onChange={(_, p) => handlePageChange(p)} />
          )}
          <Dialog maxWidth="xs" fullWidth open={!!deletingTodo} onClose={() => setDeletingTodo(null)}>
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
        </>
      ) : (
        <Empty />
      )}
    </Stack>
  );
};

export default ToDoList;
