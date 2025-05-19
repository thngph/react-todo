import { Grid, Skeleton } from '@mui/material';

export const CategorySkeleton = () => {
  return (
    <Grid container spacing={2} padding={2} justifyContent="flex-start">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Grid key={index} size={2}>
            <Skeleton
              variant="rectangular"
              sx={(theme) => ({
                width: theme.spacing(10),
                height: theme.spacing(10),
                borderRadius: 8
              })}
            />
            <Skeleton variant="text" />
          </Grid>
        ))}
    </Grid>
  );
};

export default CategorySkeleton;
