import { Button, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../libs/query-client';
import { ToDo } from '../../../types/ToDo';

type NewToDoForm = Pick<ToDo, 'title'>;
type NewToDoFormErrors = Partial<{
  [key in keyof NewToDoForm]: string;
}>;

type NewToDoFormProps = {
  onClose: () => void;
};

const validateForm = (formData: NewToDoForm): NewToDoFormErrors | null => {
  const errors: NewToDoFormErrors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Title is required';
  }

  return Object.keys(errors).length ? errors : null;
};

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

  const formRef = useRef<NewToDoForm>({
    title: ''
  });
  const [errors, setErrors] = useState<NewToDoFormErrors | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    const currentForm = { ...formRef.current, [name]: value };

    const err = validateForm(currentForm);
    setErrors(err);

    if (!err) {
      setIsDirty(true);
      formRef.current = currentForm;
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onClose();
    },
    onError: () => {
      toast.error('Failed to create todo');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formRef.current);
    if (errors) {
      setErrors(errors);
      return;
    }

    mutation.mutate(formRef.current);
  };

  return (
    <Stack component="form" sx={{ padding: 2 }} spacing={2} onSubmit={handleSubmit}>
      <TextField
        label="Title*"
        name="title"
        variant="outlined"
        fullWidth
        error={!!errors?.title}
        helperText={errors?.title}
        autoFocus
        onChange={handleChange}
      />
      <Stack spacing={1} direction="row" justifyContent="end">
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" loading={mutation.isPending} disabled={!!errors || !isDirty} type="submit">
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewToDoForm;
