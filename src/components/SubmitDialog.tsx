import { Button, CircularProgress, Dialog, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type SubmitDialogProps = {
  title?: string;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  isPending?: boolean;
  children: ReactNode;
};

const SubmitDialog = ({ title, open, onSubmit, onClose, isPending, children }: SubmitDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack sx={{ width: '400px', p: 2, borderRadius: 2 }} spacing={2}>
        {title && <Typography variant="h5">{title}</Typography>}

        {children}

        <Stack spacing={2} direction="row" justifyContent="end">
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={isPending}
            sx={{ minWidth: '100px' }}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : 'Create'}
          </Button>
          <Button variant="text" color="info" onClick={onClose} sx={{ minWidth: '100px' }}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default SubmitDialog;
