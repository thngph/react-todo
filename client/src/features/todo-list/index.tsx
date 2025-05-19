import { Pagination, Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import { match } from 'ts-pattern';
import { Empty } from '../../components/Empty';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { fetcher } from '../../libs/query-client';
import { Paginated } from '../../types/Paginated';
import { Todo } from '../../types/Todo';
import { TodoData } from '../new-todo';
import TodoItem from './components/TodoItem';
import TodoSkeleton from './components/TodoSkeleton';

type TodoListProps = {
  onDelete: (todo: Todo) => void;
  handleOpenForm: (todo: TodoData) => void;
};

export const TodoList = (props: TodoListProps) => {
  const { onDelete, handleOpenForm } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get(SEARCH_PARAM_KEY.KEYWORD) || '';
  const filter = searchParams.get(SEARCH_PARAM_KEY.FILTER) || 'ALL';
  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE)) || 1,
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT)) || DEFAULT.PAGE_LIMIT
  ];

  const isCompleted = match(filter)
    .with('DONE', () => true)
    .with('TODO', () => false)
    .otherwise(() => undefined);

  const params = {
    _limit: limit,
    _page: page,
    _sort: 'createdAt',
    _order: 'desc',
    isCompleted: isCompleted,
    ...(keyword && { title_like: keyword })
  };

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEY.TODOS, params],
    queryFn: fetcher<Paginated<Todo>>(PATH.TODO, { params }),
    placeholderData: keepPreviousData
  });

  const handlePageChange = (page: number) => {
    searchParams.set(SEARCH_PARAM_KEY.PAGE, page.toString());
    setSearchParams(searchParams);
  };

  const { docs: todos, pagination } = data || {};

  const totalPage = Math.ceil((pagination?._total || 0) / (pagination?._limit || DEFAULT.PAGE_LIMIT));

  React.useEffect(() => {
    if (totalPage < page) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [totalPage, page]);

  if (isFetching) return <TodoSkeleton />;
  if (!todos?.length) return <Empty />;

  return (
    <>
      <Stack spacing={1} width={1} sx={{ width: 1, flexGrow: 1 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDelete(todo)}
            handleOpenEdit={() => handleOpenForm(todo)}
          />
        ))}
      </Stack>

      {Number(pagination?._total) > limit && (
        <Pagination count={totalPage} page={page} onChange={(_, p) => handlePageChange(p)} />
      )}
    </>
  );
};

export default TodoList;
