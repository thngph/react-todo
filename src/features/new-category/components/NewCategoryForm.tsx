import { Autocomplete, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { QUERY_KEY } from '../../../constants/key';
import useDebounce from '../../../hooks/useDebounce';
import { axiosInstance } from '../../../libs/query-client';
import { Category } from '../../../types/Category';
import useGetIcons from '../hooks/useGetIcons';

type NewCategoryFormProps = {
  onClose: () => void;
};

type NewCategoryForm = Partial<Omit<Category, 'id'>>;
const defaultValues: NewCategoryForm = {
  color: '#6573c3',
  icon: ''
};

const createCategory = async (formData: NewCategoryForm) => {
  const now = new Date().toISOString();

  return axiosInstance.post('/categories', {
    ...formData,
    createdAt: now,
    updatedAt: now
  });
};

export const NewCategoryForm = (props: NewCategoryFormProps) => {
  const { onClose } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm({ defaultValues, mode: 'all' });

  const [search, setSearch] = React.useState<string>('');

  const icons = useGetIcons({ limit: 20, search });

  const handleSearch = React.useCallback(
    useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(ev.target.value.trim());
    }, 200),
    []
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORIES] });
      onClose();
    },
    onError: () => {
      toast.error('Failed to create category');
    }
  });

  const onSubmit = (data: NewCategoryForm) => mutation.mutate(data);

  return (
    <Stack component="form" sx={{ padding: 2, borderRadius: 3 }} spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">New Category</Typography>

      {/* Name Field */}
      <TextField
        label="Name*"
        {...register('name', { required: 'Name is required' })}
        error={Boolean(errors.name)}
        helperText={errors?.name?.message}
        fullWidth
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
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              sx={{ flexGrow: 1 }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { flexShrink: 0 } }} {...props}>
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

      {/* Action Buttons */}
      <Stack spacing={1} direction="row" justifyContent="end">
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>

        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewCategoryForm;
