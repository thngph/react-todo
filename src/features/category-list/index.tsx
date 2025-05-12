import { Grid } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../constants/key';
import { PATH } from '../../constants/path';
import { fetcher } from '../../libs/query-client';
import { Category } from '../../types/Category';
import { Paginated } from '../../types/Paginated';
import CategoryItem from './CategoryItem';

export const CategoryList = () => {
  const [searchParams] = useSearchParams();

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
    <Grid container spacing={2} padding={2} justifyContent="flex-start">
      {categories?.length ? (
        [...categories, ...categories].map((category) => (
          <Grid key={category.id} size={3}>
            <CategoryItem category={category} />
          </Grid>
        ))
      ) : (
        <div>No Category</div>
      )}
    </Grid>
  );
};

export default CategoryList;
