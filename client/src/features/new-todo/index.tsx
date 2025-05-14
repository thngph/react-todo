import { Dialog } from '@mui/material';
import { NewToDoForm } from './components/NewToDoForm';

type NewToDoPopupProps = {
  open: boolean;
  onClose: () => void;
};

export const NewToDoPopup = (props: NewToDoPopupProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <NewToDoForm onClose={onClose} />
    </Dialog>
  );
};

export default NewToDoPopup;
