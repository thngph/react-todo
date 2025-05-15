import { Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT } from '../../../constants/default';
import { QUERY_KEY } from '../../../constants/key';
import useDebounce from '../../../hooks/useDebounce';
import { axiosInstance } from '../../../libs/query-client';
import { Category } from '../../../types/Category';
import useGetIcons from '../hooks/useGetIcons';

type NewCategoryFormProps = {
  onClose: () => void;
  defaultValues?: CategoryData;
};

export type CategoryData = Omit<Category, 'id'> & Partial<Pick<Category, 'id'>>;

const createCategory = async (formData: CategoryData) => {
  const now = new Date().toISOString();

  return axiosInstance.post('/categories', {
    ...formData,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now
  });
};

const updateCategory = async (formData: CategoryData) => {
  const now = new Date().toISOString();

  return axiosInstance.put(`/categories/${formData.id}`, {
    ...formData,
    updatedAt: now
  });
};

export const CategoryForm = (props: NewCategoryFormProps) => {
  const { onClose, defaultValues } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm({ defaultValues, mode: 'all' });

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
    onClose();
  };

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: onSuccess,
    onError: () => toast.error('Failed to create category')
  });
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: onSuccess,
    onError: () => toast.error('Failed to update category')
  });

  const mutation = defaultValues?.id ? updateCategoryMutation : createCategoryMutation;

  const onSubmit = (data: CategoryData) => mutation.mutate(data);

  const [search, setSearch] = React.useState<string>('');
  const handleSearch = React.useCallback(
    useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value.trim()), DEFAULT.INPUT_DEBOUNCE),
    []
  );
  const icons = useGetIcons({ limit: 20, search });

  return (
    <Box component="form" sx={{ borderRadius: 3 }} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>New Category</DialogTitle>

      <DialogContent>
        <Stack spacing={2} pt={1}>
          {/* Name Field */}
          <TextField
            label="Name*"
            {...register('name', { required: 'Name is required' })}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message}
            fullWidth
            autoFocus
          />
          {/* Icon and Color Fields */}
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Controller
              name="icon"
              control={control}
              rules={{ required: 'Icon is required' }}
              render={({ field }) => (
                <Autocomplete
                  options={icons}
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  sx={{ flexGrow: 1 }}
                  renderOption={({ key, ...props }, option) => (
                    <Box key={key} component="li" sx={{ '& > img': { flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={option} alt="" />
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category icon*"
                      onChange={handleSearch}
                      error={Boolean(errors.icon)}
                      helperText={errors?.icon?.message}
                      sx={{ flexGrow: 1 }}
                    />
                  )}
                  renderValue={(value, getItemProps) => {
                    return (
                      <Box sx={{ '& > img': { flexShrink: 0 } }} {...getItemProps}>
                        <img loading="lazy" width="20" src={value} alt="" />
                      </Box>
                    );
                  }}
                />
              )}
            />

            <TextField
              label="Color*"
              type="color"
              {...register('color', { required: 'Color is required' })}
              sx={{ flexGrow: 1 }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={(theme) => ({ padding: theme.spacing(0, 3, 2) })}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>

        <Button variant="contained" type="submit">
          Create
        </Button>
      </DialogActions>
    </Box>
  );
};

export default CategoryForm;
