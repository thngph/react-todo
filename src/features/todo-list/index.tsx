import { Pagination, Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import Search from '../../components/layout/SearchBar';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { fetcher } from '../../libs/query-client';
import { Paginated } from '../../types/Paginated';
import { ToDo } from '../../types/ToDo';
import { NoToDo } from './NoToDo';
import ToDoItem from './ToDoItem';

const NewToDo = React.lazy(() => import('../new-todo/NewToDo'));

export const ToDoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set(SEARCH_PARAM_KEY.PAGE, value.toString());
    setSearchParams(searchParams);
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEY.TODOS, params],
    queryFn: fetcher<Paginated<ToDo>>(PATH.TODO, { params }),
    placeholderData: keepPreviousData
  });

  const { docs: todos, pagination } = data || {};

  const totalPage = Math.ceil((pagination?._total || 0) / (pagination?._limit || DEFAULT.PAGE_LIMIT));

  return (
    <>
      <NewToDo />
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Search />
        <Stack spacing={1} width={1}>
          {todos?.length ? todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />) : <NoToDo />}
        </Stack>
        {Number(pagination?._total) > limit && <Pagination count={totalPage} page={page} onChange={handlePageChange} />}
      </Stack>
    </>
  );
};

export default ToDoList;
