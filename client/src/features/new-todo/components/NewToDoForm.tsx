import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { QUERY_KEY } from '../../../constants/key';
import { axiosInstance } from '../../../libs/query-client';
import { ToDo } from '../../../types/ToDo';

type NewToDoForm = Pick<ToDo, 'title'>;

type NewToDoFormProps = {
  onClose: () => void;
};
const defaultValues: NewToDoForm = { title: '' };

const createToDo = async (formData: NewToDoForm) => {
  const now = new Date().toISOString();

  return axiosInstance.post('/todos', {
    ...formData,
    createdAt: now,
    updatedAt: now,
    isCompleted: false
  });
};

export const NewToDoForm = (props: NewToDoFormProps) => {
  const { onClose } = props;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
      onClose();
    },
    onError: () => {
      toast.error('Failed to create todo');
    }
  });

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({ defaultValues, mode: 'all' });

  return (
    <Stack
      component="form"
      sx={{ padding: 2, borderRadius: 3 }}
      spacing={2}
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Typography variant="h6">New Todo</Typography>

      <TextField
        label="Title*"
        variant="outlined"
        {...register('title', { required: 'Title is required' })}
        error={Boolean(errors.title)}
        helperText={errors?.title?.message}
        fullWidth
        autoFocus
      />

      <Stack spacing={1} direction="row" justifyContent="end">
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" loading={mutation.isPending} type="submit">
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewToDoForm;
