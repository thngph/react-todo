import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/key';
import { PATH } from '../../../constants/path';
import { fetcher } from '../../../libs/query-client';
import { Category } from '../../../types/Category';

type TodoCategoryProps = { id: Category['id'] };

export const TodoCategory = (props: TodoCategoryProps) => {
  const { id } = props;

  const { data: category } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, id],
    queryFn: fetcher<Category>(`${PATH.CATEGORY}/${id}`)
  });

  if (!category) return null;

  return (
    <Stack title={category.name} sx={{ flexShrink: 0, bgcolor: category.color, borderRadius: 8, padding: 1 }}>
      <Box component="img" src={category.icon} />
    </Stack>
  );
};

export default TodoCategory;
