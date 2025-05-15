import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TodoData } from '..';
import { DEFAULT } from '../../../constants/default';
import useDebounce from '../../../hooks/useDebounce';
import useCategoriesQuery from '../../category-list/hooks/useCategoriesQuery';

type TodoFormProps = {
  onClose: () => void;
  onSubmit: (data: TodoData) => void;
  isPending: boolean;
  title?: string;
  defaultValues?: TodoData;
};

export const TodoForm = (props: TodoFormProps) => {
  const { onClose, title, defaultValues, onSubmit, isPending } = props;

  const {
    handleSubmit,
    formState: { errors },
    register,
    control
  } = useForm({ defaultValues, mode: 'all' });

  const [search, setSearch] = React.useState<string>('');
  const handleSearch = React.useCallback(
    useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value.trim()), DEFAULT.INPUT_DEBOUNCE),
    []
  );

  const { data, isLoading } = useCategoriesQuery({ name_like: search });

  const categories = data?.docs || [];

  return (
    <Box component="form" sx={{ borderRadius: 3 }} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>{title ?? 'New Todo'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} pt={1}>
          <TextField
            label="Title*"
            variant="outlined"
            {...register('title', { required: 'Title is required' })}
            error={Boolean(errors.title)}
            helperText={errors?.title?.message}
            fullWidth
            autoFocus
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={categories}
                loading={isLoading}
                value={categories.find((c) => c.id === field.value) || null}
                onChange={(_, newValue) => field.onChange(newValue?.id)}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                renderOption={({ key, ...props }, option) => (
                  <Box key={key} component="li" sx={{ '& > img': { flexShrink: 0 } }} {...props}>
                    <img loading="lazy" width="20" src={option.icon} alt="" />
                    <Typography noWrap>{option.name}</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Category" sx={{ flexGrow: 1 }} onChange={handleSearch} />
                )}
                renderValue={(category, getItemProps) => {
                  return (
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ '& > img': { flexShrink: 0 }, alignItems: 'center', overflow: 'hidden' }}
                      {...getItemProps}
                    >
                      <img loading="lazy" width="20" src={category.icon} alt="" />
                      <Typography component="span" noWrap>
                        {category.name}
                      </Typography>
                    </Stack>
                  );
                }}
              ></Autocomplete>
            )}
          ></Controller>
        </Stack>
      </DialogContent>

      <DialogActions sx={(theme) => ({ padding: theme.spacing(0, 3, 2) })}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" loading={isPending} type="submit">
          {defaultValues?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default TodoForm;
