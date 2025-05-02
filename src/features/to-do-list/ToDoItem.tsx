import { CheckCircle, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance, queryClient } from '../../libs/query-client';
import { ToDo } from '../../types/ToDo';
import dateFormater from '../../utils/dateFormater';

type ToDoProps = { todo: ToDo };

const markDone = async ({ id, isCompleted }: Pick<ToDo, 'id' | 'isCompleted'>) => {
  return axiosInstance.patch(`/todos/${id}`, { isCompleted });
};

const deleteToDo = async ({ id }: Pick<ToDo, 'id'>) => {
  return axiosInstance.delete(`/todos/${id}`);
};

export const ToDoItem = (props: ToDoProps) => {
  const { todo } = props;

  const markDoneMutation = useMutation({
    mutationFn: markDone,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });

  const deleteToDoMutation = useMutation({
    mutationFn: deleteToDo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });

  const handleComplete = () => {
    markDoneMutation.mutate({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  const handleDelete = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (deleteToDoMutation.isPending) return;
    deleteToDoMutation.mutate({ id: todo.id });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        bgcolor: 'grey.300',
        minHeight: '85px',
        padding: '16px 8px',
        borderRadius: 2,

        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'grey.400',
          transition: 'background-color .15s'
        },

        '&:hover .delete-button': {
          display: 'flex'
        }
      }}
      onClick={handleComplete}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Checkbox
          color="success"
          checked={todo.isCompleted}
          readOnly
          size="medium"
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckCircle />}
        />
        <Stack>
          <Typography variant="h5">{todo.title}</Typography>
          <Typography color="textDisabled">{dateFormater(todo.createdAt)}</Typography>
        </Stack>
      </Stack>
      <Box>
        <Delete
          className="delete-button"
          sx={{
            display: 'none',
            width: '42px',
            '&:hover': {
              color: 'error.main',
              cursor: 'pointer'
            }
          }}
          onClick={handleDelete}
        />
      </Box>
    </Stack>
  );
};

export default ToDoItem;
