import { Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import Search from '../../components/layout/SearchBar';
import { fetcher } from '../../libs/query-client';
import { Paginated } from '../../types/Paginated';
import { ToDo } from '../../types/ToDo';
import { NoToDo } from './NoToDo';
import ToDoItem from './ToDoItem';

const NewToDo = React.lazy(() => import('../new-todo/NewToDo'));

export const ToDoList = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const params = {
    _limit: 5,
    _page: 1,
    _sort: 'createdAt',
    _order: 'desc',
    ...(keyword && { title_like: keyword })
  };

  const { data } = useQuery({
    queryKey: ['todos', params],
    queryFn: fetcher<Paginated<ToDo>>('todos', { params }),
    placeholderData: keepPreviousData
  });

  const todos = data?.docs;

  return (
    <Stack spacing={2}>
      <Search />
      <Stack spacing={1}>
        {todos?.length ? todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />) : <NoToDo />}
      </Stack>
      <NewToDo />
    </Stack>
  );
};

export default ToDoList;
