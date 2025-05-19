import { CheckCircle, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { Checkbox, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { QUERY_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { axiosInstance } from '../../../libs/query-client';
import { Todo } from '../../../types/Todo';
import dateFormater from '../../../utils/dateFormater';
import TodoCategory from './TodoCategory';

type TodoProps = { todo: Todo; onDelete: () => void; handleOpenEdit: () => void };

const markDone = async ({ id, isCompleted }: Pick<Todo, 'id' | 'isCompleted'>) =>
  axiosInstance.patch(`${PATH.TODO}/${id}`, { isCompleted });

export const TodoItem = React.memo((props: TodoProps) => {
  const { todo, onDelete, handleOpenEdit } = props;

  const queryClient = useQueryClient();

  const markDoneMutation = useMutation({
    mutationFn: markDone,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
  });

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    markDoneMutation.mutate({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      sx={(theme) => ({
        bgcolor: 'grey.300',
        padding: theme.spacing(1, 2),
        borderRadius: 3,

        cursor: 'pointer',
        '&:hover': { bgcolor: 'grey.400', transition: 'background-color .15s' }
      })}
      onClick={handleOpenEdit}
    >
      <Stack flexGrow={1} overflow="hidden">
        <Typography noWrap>{todo.title}</Typography>
        <Typography variant="body2" color="textDisabled">
          {dateFormater(todo.createdAt)}
        </Typography>
      </Stack>

      {todo.categoryId && <TodoCategory id={todo.categoryId} />}

      <Checkbox
        color="primary"
        checked={todo.isCompleted}
        size="medium"
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        sx={{ flexShrink: 0 }}
        onClick={(e) => handleComplete(e)}
      />

      <Stack
        direction="row"
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexShrink: 0,
          '&:hover': { color: 'error.main', cursor: 'pointer' }
        }}
        onClick={(ev) => {
          ev.stopPropagation();
          onDelete();
        }}
      >
        <Delete />
      </Stack>
    </Stack>
  );
});

export default TodoItem;
