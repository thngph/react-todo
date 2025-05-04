import { Add } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import SubmitDialog from '../../components/SubmitDialog';
import NewToDoForm, { NewToDoFormRef } from './components/NewToDoForm';

export const NewToDo = () => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<NewToDoFormRef>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Tooltip title="Create new To do">
        <Add
          sx={{
            height: '65px',
            width: '65px',
            bgcolor: 'primary.main',
            p: 2,
            borderRadius: 8,
            '&:hover': { bgcolor: 'grey.400', transition: 'background-color .15s' },
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        />
      </Tooltip>

      <SubmitDialog title="New To do" open={open} onSubmit={handleSubmit} onClose={handleClose} isPending={isPending}>
        <NewToDoForm ref={formRef} onPendingChange={setIsPending} onSuccess={handleClose} />
      </SubmitDialog>
    </Box>
  );
};

export default NewToDo;
