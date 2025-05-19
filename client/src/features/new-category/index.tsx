import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { v4 as uuid4 } from 'uuid';
import Dialog from '../../components/ui/Dialog';
import { QUERY_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { axiosInstance } from '../../libs/query-client';
import CategoryForm, { CategoryData } from './components/CategoryForm';

type CategoryPopupProps = {
  open: boolean;
  onClose: () => void;
  defaultValues?: CategoryData;
};

const createCategory = async (formData: CategoryData) => {
  const now = new Date().toISOString();

  return axiosInstance.post(PATH.CATEGORY, {
    ...formData,
    id: uuid4(),
    createdAt: now,
    updatedAt: now
  });
};

const updateCategory = async (formData: CategoryData) => {
  const now = new Date().toISOString();

  return axiosInstance.put(`${PATH.CATEGORY}/${formData.id}`, {
    ...formData,
    updatedAt: now
  });
};

export const CategoryPopup = (props: CategoryPopupProps) => {
  const { open, onClose, defaultValues } = props;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
    onClose();
  };

  const onError = (msg: string) => toast.error(msg);

  const mutation = useMutation({
    mutationFn: defaultValues?.id ? updateCategory : createCategory,
    onSuccess,
    onError: () => onError(defaultValues?.id ? 'Update category failed' : 'Create category failed')
  });

  const title = defaultValues?.id ? 'Edit category' : 'Create category';

  return (
    <Dialog open={open} onClose={onClose}>
      <CategoryForm
        onClose={onClose}
        onSubmit={(data) => mutation.mutate(data)}
        defaultValues={defaultValues}
        title={title}
      />
    </Dialog>
  );
};

export default CategoryPopup;
