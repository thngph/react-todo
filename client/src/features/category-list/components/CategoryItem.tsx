import { Clear } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Category } from '../../../types/Category';

type CategoryItemProps = { category: Category; onClick: () => void; onDelete: () => void };

export const CategoryItem = React.memo((props: CategoryItemProps) => {
  const { category, onClick, onDelete } = props;

  return (
    <Stack
      sx={{
        flexGrow: 1,
        '&:hover': { cursor: 'pointer' },
        '&:hover > button': { display: 'flex' },
        '> button': { display: 'none' },
        position: 'relative'
      }}
      title={category.name}
      onClick={onClick}
    >
      <Stack
        sx={(theme) => ({
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: category.color,
          borderRadius: 8,
          width: theme.spacing(10),
          height: theme.spacing(10)
        })}
      >
        <Box component="img" src={category.icon} sx={{ width: '50%' }} />
      </Stack>

      <IconButton
        size="small"
        title="Delete"
        sx={{ position: 'absolute', top: 0, right: 0, borderRadius: 8, transform: 'translate(30%, -40%)' }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Clear />
      </IconButton>

      <Typography align="center" noWrap>
        {category.name}
      </Typography>
    </Stack>
  );
});
export default CategoryItem;
