import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { fetcher } from '../../../libs/query-client';
import { Category } from '../../../types/Category';

type ToDoCategoryProps = { id: Category['id'] };

export const ToDoCategory = (props: ToDoCategoryProps) => {
  const { id } = props;

  const { data: category } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: fetcher<Category>(`${PATH.CATEGORY}/${id}`)
  });

  if (!category) return null;

  return (
    <Stack title={category.name} sx={{ flexShrink: 0, bgcolor: category.color, borderRadius: 8, padding: 1 }}>
      <Box component="img" src={category.icon} />
    </Stack>
  );
};

export default ToDoCategory;
