import { CheckCircle, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { Checkbox, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance } from '../../libs/query-client';
import { ToDo } from '../../types/ToDo';
import dateFormater from '../../utils/dateFormater';

type ToDoProps = { todo: ToDo };

const markDone = async ({ id, isCompleted }: Pick<ToDo, 'id' | 'isCompleted'>) =>
  axiosInstance.patch(`${PATH.TODO}/${id}`, { isCompleted });

const deleteToDo = async ({ id }: Pick<ToDo, 'id'>) => axiosInstance.delete(`${PATH.TODO}/${id}`);

export const ToDoItem = (props: ToDoProps) => {
  const { todo } = props;

  const queryClient = useQueryClient();

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
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={(theme) => ({
          bgcolor: 'grey.300',

          padding: theme.spacing(2, 1),
          borderRadius: 2,

          cursor: 'pointer',
          '&:hover': { bgcolor: 'grey.400', transition: 'background-color .15s' }
        })}
        onClick={handleComplete}
      >
        <Checkbox
          color="primary"
          checked={todo.isCompleted}
          readOnly
          size="medium"
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckCircle />}
          sx={{ flexShrink: 0 }}
        />
        <Stack flexGrow={1} overflow="hidden">
          <Typography noWrap variant="h5">
            {todo.title}
          </Typography>
          <Typography color="textDisabled">{dateFormater(todo.createdAt)}</Typography>
        </Stack>

        <Delete sx={{ '&:hover': { color: 'error.main', cursor: 'pointer' } }} onClick={handleDelete} />
      </Stack>
    </>
  );
};

export default ToDoItem;
