import { useQuery } from '@tanstack/react-query';
import { CONFIG } from '../../../constants/common';
import { QUERY_KEY } from '../../../constants/key';
import { fetcher } from '../../../libs/query-client';

type GetIconProps = {
  limit?: number;
  search?: string;
};

export const useGetIcons = (props?: GetIconProps) => {
  const { limit = 10, search = '' } = props || {};

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CATEGORY_ICON],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: fetcher<any>(`${CONFIG.ICONIFY_API_URI}/collection?prefix=${CONFIG.CATEGORY_ICON_PREFIX}`),
    staleTime: Infinity
  });

  if (isLoading) return [];

  const filteredIcons = (Object.values(data?.categories) as string[])
    .flatMap((v) => v)
    .filter((icon) => (search ? icon.includes(search) : true))
    .slice(0, limit);

  return filteredIcons.map((icon) => `${CONFIG.ICONIFY_API_URI}/${CONFIG.CATEGORY_ICON_PREFIX}/${icon}.svg`);
};

export default useGetIcons;
