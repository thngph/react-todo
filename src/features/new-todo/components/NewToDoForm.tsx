import { Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useImperativeHandle, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { axiosInstance } from '../../../libs/query-client';
import { ToDo } from '../../../types/ToDo';

type CreateToDo = Pick<ToDo, 'title'>;

export type NewToDoFormRef = {
  submit: () => void;
  isPending: boolean;
};

type Props = {
  ref?: React.Ref<NewToDoFormRef>;
  onPendingChange?: (pending: boolean) => void;
  onSuccess?: () => void;
};

const addToDo = (todo: CreateToDo) => {
  const now = new Date();
  return axiosInstance.post('/todos', {
    ...todo,
    id: uuid4(),
    isCompleted: false,
    createdAt: now,
    updatedAt: now
  });
};

const NewToDoForm = ({ ref, onPendingChange, onSuccess }: Props) => {
  const [formStates, setFormStates] = useState<CreateToDo>({ title: '' });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToDo,
    onMutate: () => onPendingChange?.(true),
    onSettled: () => onPendingChange?.(false),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const handleSubmit = (ev?: React.FormEvent<HTMLFormElement>) => {
    if (ev) ev.preventDefault();
    mutation.mutate(formStates);
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    isPending: mutation.isPending
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          variant="standard"
          fullWidth
          onChange={(ev) => setFormStates({ ...formStates, title: ev.target.value })}
          value={formStates.title}
          placeholder="Title"
        />
      </Stack>
    </form>
  );
};

export default NewToDoForm;
