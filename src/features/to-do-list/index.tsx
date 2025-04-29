import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ServerError from '../../components/ServerError';
import { fetcher } from '../../libs/query-client';
import { ToDo } from '../../types/ToDo';
import ToDoItem from './ToDoItem';
import ToDoLoading from './ToDoLoading';

export const ToDoList = () => {
  const { data: todos = [], isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: fetcher<ToDo[]>('todos') });

  if (isLoading) return <ToDoLoading />;
  if (isError) return <ServerError />;

  return (
    <Stack spacing={1}>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
};

export default ToDoList;
