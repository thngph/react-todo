import { CheckCircle, Delete, RadioButtonUnchecked } from '@mui/icons-material';
import { Checkbox, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance } from '../../libs/query-client';
import { ToDo } from '../../types/ToDo';
import dateFormater from '../../utils/dateFormater';

type ToDoProps = { todo: ToDo; onDelete: () => void };

const markDone = async ({ id, isCompleted }: Pick<ToDo, 'id' | 'isCompleted'>) =>
  axiosInstance.patch(`${PATH.TODO}/${id}`, { isCompleted });

export const ToDoItem = (props: ToDoProps) => {
  const { todo, onDelete } = props;

  const queryClient = useQueryClient();

  const markDoneMutation = useMutation({
    mutationFn: markDone,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] })
  });

  const handleComplete = () => {
    markDoneMutation.mutate({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  return (
    <>
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
          <Typography noWrap>{todo.title}</Typography>
          <Typography variant="body2" color="textDisabled">
            {dateFormater(todo.createdAt)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{ width: '32px', height: '32px', justifyContent: 'flex-end', alignItems: 'center' }}
          onClick={(ev) => {
            ev.stopPropagation();
            onDelete();
          }}
        >
          <Delete sx={{ '&:hover': { color: 'error.main', cursor: 'pointer' }, flexShrink: 0 }} />
        </Stack>
      </Stack>
    </>
  );
};

export default ToDoItem;
