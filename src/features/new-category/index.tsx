import { Dialog } from '@mui/material';

type NewCategoryPopupProps = {
  open: boolean;
  onClose: () => void;
};

export const NewCategoryPopup = (props: NewCategoryPopupProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      abc
    </Dialog>
  );
};

export default NewCategoryPopup;
