import { Checkbox, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ToDo } from '../../types/ToDo';
import dateFormatter from '../../utils/date';

type ToDoProps = { todo: ToDo };
export const ToDoItem = (props: ToDoProps) => {
  const { todo } = props;
  const [checked, setChecked] = useState(todo.isCompleted);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        padding: 1,
        bgcolor: 'grey.300',
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'grey.400',
          transition: 'background-color .15s'
        }
      }}
      onClick={() => setChecked(!checked)}
    >
      <Checkbox checked={checked} size="small" />
      <Stack>
        <Typography>{todo.title}</Typography>
        <Typography>{dateFormatter(todo.createdAt)}</Typography>
      </Stack>
    </Stack>
  );
};

export default ToDoItem;
