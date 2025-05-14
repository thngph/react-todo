import { Add } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router';
import { DEFAULT } from '../../constants/default';
import { SEARCH_PARAM_KEY } from '../../constants/key';
import NewCategoryPopup from '../new-category';
import CategoryItem from './components/CategoryItem';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';

export const CategoryList = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE)) || 1,
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT)) || DEFAULT.PAGE_LIMIT
  ];

  const params = {
    _limit: limit,
    _page: page,
    name_like: searchParams.get('keyword') || undefined
  };
  const { data: { docs: categories = [] } = {}, isLoading } = useCategoriesQuery(params);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
        {categories?.length &&
          categories.map((category) => (
            <Grid key={category.id} size={2}>
              <CategoryItem category={category} />
            </Grid>
          ))}

        <Grid size={2} sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <Stack alignItems="center">
            <Stack
              sx={(theme) => ({
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed',
                width: theme.spacing(10),
                height: theme.spacing(10),
                borderRadius: 8
              })}
            >
              <Add />
            </Stack>
            <Typography>Add new</Typography>
          </Stack>
        </Grid>
      </Grid>
      <NewCategoryPopup open={open} onClose={() => setOpen(false)}></NewCategoryPopup>
    </>
  );
};

export default CategoryList;
