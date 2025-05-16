import { Grid, Stack, Typography } from '@mui/material';

export const CategorySkeleton = () => {
  return (
    <Grid container spacing={2} padding={2} justifyContent="flex-start" sx={{ color: 'grey.500' }}>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Grid key={index} size={2}>
            <Stack
              sx={(theme) => ({
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed',
                width: theme.spacing(10),
                height: theme.spacing(10),
                borderRadius: 8
              })}
            ></Stack>
            <Typography>''</Typography>
          </Grid>
        ))}
    </Grid>
  );
};

export default CategorySkeleton;
