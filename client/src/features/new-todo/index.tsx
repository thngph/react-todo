import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { v4 as uuid4 } from 'uuid';
import { Dialog } from '../../components/ui/Dialog';
import { QUERY_KEY } from '../../constants/key';
import { axiosInstance } from '../../libs/query-client';
import { Todo } from '../../types/Todo';
import { TodoForm } from './components/TodoForm';

export type TodoData = Pick<Todo, 'title' | 'categoryId'> & Partial<Pick<Todo, 'id'>>;

const createTodo = async (formData: TodoData) => {
  const now = new Date().toISOString();
  return axiosInstance.post('/todos', {
    ...formData,
    id: uuid4(),
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
  defaultValues?: TodoData;
};

export const TodoPopup = (props: TodoPopupProps) => {
  const { open, onClose, defaultValues } = props;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOS] });
    onClose();
  };

  const onError = (msg: string) => toast.error(msg);

  const mutation = useMutation({
    mutationFn: defaultValues?.id ? updateTodo : createTodo,
    onSuccess,
    onError: () => onError(defaultValues?.id ? 'Update todo failed' : 'Create todo failed')
  });

  const title = defaultValues?.id ? 'Edit todo' : 'Create todo';

  return (
    <Dialog open={open} onClose={onClose}>
      <TodoForm
        onClose={onClose}
        onSubmit={(data) => mutation.mutate(data)}
        title={title}
        isPending={mutation.isPending}
        defaultValues={defaultValues}
      />
    </Dialog>
  );
};

export default TodoPopup;
