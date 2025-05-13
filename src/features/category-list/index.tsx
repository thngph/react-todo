import { Add } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { fetcher } from '../../libs/query-client';
import { Category } from '../../types/Category';
import { Paginated } from '../../types/Paginated';
import NewCategoryPopup from '../new-category';
import CategoryItem from './CategoryItem';

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
    _sort: 'createdAt',
    _order: 'desc'
  };
  const { data } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, params],
    queryFn: fetcher<Paginated<Category>>(PATH.CATEGORY, { params }),
    placeholderData: keepPreviousData
  });

  const { docs: categories } = data || {};

  return (
    <>
      <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
        {categories?.length &&
          [...categories, ...categories].map((category, i) => (
            <Grid key={category.id + i} size={3}>
              <CategoryItem category={category} />
            </Grid>
          ))}

        <Grid size={3} sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <Stack alignItems="center">
            <Stack
              sx={(theme) => ({
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed',
                width: theme.spacing(12),
                height: theme.spacing(12),
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
