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
    queryKey: [QUERY_KEY.TODOS, params],
    queryFn: fetcher<Paginated<Category>>(PATH.CATEGORY, { params }),
    placeholderData: keepPreviousData
  });

  const { docs: categories } = data || {};

  return (
    <>
      {categories?.length ? (
        categories.map((category) => <CategoryItem key={category.id} category={category} />)
      ) : (
        <div>No Category</div>
      )}
    </>
  );
};

export default CategoryList;
