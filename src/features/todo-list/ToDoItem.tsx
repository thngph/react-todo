import { CheckCircle, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance, queryClient } from '../../libs/query-client';
import { ToDo } from '../../types/ToDo';
import dateFormater from '../../utils/dateFormater';

type ToDoProps = { todo: ToDo };

const markDone = async ({ id, isCompleted }: Pick<ToDo, 'id' | 'isCompleted'>) =>
  axiosInstance.patch(`${PATH.TODO}/${id}`, { isCompleted });

const deleteToDo = async ({ id }: Pick<ToDo, 'id'>) => axiosInstance.delete(`${PATH.TODO}/${id}`);

export const ToDoItem = (props: ToDoProps) => {
  const { todo } = props;

  const markDoneMutation = useMutation({
    mutationFn: markDone,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
  });

  const deleteToDoMutation = useMutation({
    mutationFn: deleteToDo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
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
      sx={(theme) => ({
        bgcolor: 'grey.300',
        minHeight: '85px',
        padding: theme.spacing(2, 1),
        borderRadius: 2,

        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'grey.400',
          transition: 'background-color .15s'
        },

        '&:hover .delete-button': { opacity: 1 }
      })}
      onClick={handleComplete}
    >
      <Stack direction="row" alignItems="center" spacing={1} minWidth={0}>
        <Checkbox
          color="primary"
          checked={todo.isCompleted}
          readOnly
          size="medium"
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckCircle />}
        />
        <Stack minWidth={0}>
          <Typography variant="h5" noWrap>
            {todo.title}
          </Typography>
          <Typography color="textDisabled">{dateFormater(todo.createdAt)}</Typography>
        </Stack>
      </Stack>
      <Box>
        <Delete
          className="delete-button"
          sx={{
            width: '42px',
            opacity: 0,
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
