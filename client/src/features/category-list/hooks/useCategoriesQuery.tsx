import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { DEFAULT } from '../../../constants/default';
import { QUERY_KEY, SEARCH_PARAM_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { fetcher } from '../../../libs/query-client';
import { Category } from '../../../types/Category';
import { Paginated } from '../../../types/Paginated';

interface UseGetCategoriesParams {
  _limit?: number;
  _page?: number;
  _sort?: string;
  _order?: string;
  name_like?: string;
}
const defaultParams = {
  _sort: 'createdAt',
  _order: 'desc'
};

export const useCategoriesQuery = (_params: UseGetCategoriesParams = {}) => {
  const [searchParams] = useSearchParams();
  const [page, limit] = [
    Number(searchParams.get(SEARCH_PARAM_KEY.PAGE)) || 1,
    Number(searchParams.get(SEARCH_PARAM_KEY.LIMIT)) || DEFAULT.PAGE_LIMIT
  ];

  const params = {
    _limit: limit,
    _page: page,
    name_like: searchParams.get('keyword') || undefined
  };
  const queryParams = { ...defaultParams, ...params, ..._params };

  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, queryParams],
    queryFn: fetcher<Paginated<Category>>(PATH.CATEGORY, { params: queryParams }),
    placeholderData: keepPreviousData
  });
};

export default useCategoriesQuery;
