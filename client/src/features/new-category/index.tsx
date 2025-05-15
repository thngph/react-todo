import { Dialog } from '@mui/material';
import CategoryForm, { CategoryData } from './components/CategoryForm';

type CategoryPopupProps = {
  open: boolean;
  onClose: () => void;
  defaultValues?: CategoryData;
};

export const CategoryPopup = (props: CategoryPopupProps) => {
  const { open, onClose, defaultValues } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <CategoryForm onClose={onClose} defaultValues={defaultValues} />
    </Dialog>
  );
};

export default CategoryPopup;
