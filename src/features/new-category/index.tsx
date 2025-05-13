import { Dialog } from '@mui/material';
import { NewCategoryForm } from './components/NewCategoryForm';

type NewCategoryPopupProps = {
  open: boolean;
  onClose: () => void;
};

export const NewCategoryPopup = (props: NewCategoryPopupProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <NewCategoryForm onClose={onClose} />
    </Dialog>
  );
};

export default NewCategoryPopup;
