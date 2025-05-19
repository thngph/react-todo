import { DialogProps, Dialog as MuiDialog, PaperProps } from '@mui/material';

const paperProps: Partial<PaperProps> = {
  sx: {
    width: 400,
    maxWidth: '100%'
  }
};

export const Dialog = (props: DialogProps) => {
  return <MuiDialog slotProps={{ paper: { ...paperProps } }} {...props} />;
};

export default Dialog;
