import { Autocomplete, Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useDebounce from '../../../hooks/useDebounce';
import { Category } from '../../../types/Category';
import useGetIcons from '../hooks/useGetIcons';

type NewCategoryFormProps = {
  onClose: () => void;
};

type NewCategoryForm = Omit<Category, 'id'>;
const defaultValues: NewCategoryForm = {
  name: '',
  icon: '',
  color: '#6573c3'
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
      const search = ev.target.value.trim();
      setSearch(search);
    }, 200),
    []
  );

  return (
    <Stack
      component="form"
      sx={{ padding: 2, borderRadius: 3 }}
      spacing={2}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Typography variant="h6">New Category</Typography>

      <TextField
        label="Name*"
        variant="outlined"
        {...register('name', { required: 'Name is required' })}
        error={Boolean(errors.name)}
        helperText={errors?.name?.message}
        fullWidth
      />
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
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box key={key} component="li" sx={{ '& > img': { flexShrink: 0 } }} {...optionProps}>
                    <img loading="lazy" width="20" src={option} alt="" />
                  </Box>
                );
              }}
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
          variant="outlined"
          {...register('color', { required: 'Color is required' })}
          sx={{ flexGrow: 1 }}
        />
      </Stack>

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
