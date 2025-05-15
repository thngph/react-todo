import { Dialog } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { QUERY_KEY } from '../../constants/key';
import { axiosInstance } from '../../libs/query-client';
import { Todo } from '../../types/Todo';
import { TodoForm } from './components/TodoForm';

export type TodoData = Pick<Todo, 'title' | 'categoryId'> & Partial<Pick<Todo, 'id'>>;

const createTodo = async (formData: TodoData) => {
  const now = new Date().toISOString();
  return axiosInstance.post('/todos', {
    ...formData,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    isCompleted: false
  });
};

const updateTodo = async (formData: TodoData) => {
  const now = new Date().toISOString();
  return axiosInstance.put(`/todos/${formData.id}`, { ...formData, updatedAt: now });
};

type TodoPopupProps = {
  open: boolean;
  onClose: () => void;
  defaultValues: TodoData;
};

export const TodoPopup = (props: TodoPopupProps) => {
  const { open, onClose, defaultValues } = props;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
    onClose();
  };
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: onSuccess,
    onError: () => toast.error('Failed to create todo')
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: onSuccess,
    onError: () => toast.error('Failed to update todo')
  });

  const mutation = defaultValues.id ? updateTodoMutation : createTodoMutation;

  return (
    <Dialog open={open} onClose={onClose}>
      <TodoForm
        onClose={onClose}
        onSubmit={(data) => mutation.mutate(data)}
        isPending={mutation.isPending}
        defaultValues={defaultValues}
      />
    </Dialog>
  );
};

export default TodoPopup;
