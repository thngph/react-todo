import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/key';
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

export const useCategoriesQuery = (params: UseGetCategoriesParams = {}) => {
  const defaultParams = {
    _limit: -1,
    _page: 1,
    _sort: 'createdAt',
    _order: 'desc'
  };

  const queryParams = { ...defaultParams, ...params };

  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, queryParams],
    queryFn: fetcher<Paginated<Category>>(PATH.CATEGORY, { params: queryParams }),
    placeholderData: {
      docs: [],
      pagination: {
        _page: 1,
        _limit: 10,
        _total: 10
      }
    }
  });
};

export default useCategoriesQuery;
