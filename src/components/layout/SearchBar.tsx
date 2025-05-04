import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router';
import useDebounce from '../../hooks/useDebounce';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchDebounce = React.useCallback(
    useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = ev.target.value.trim();

      if (keyword) searchParams.set('keyword', keyword);
      else searchParams.delete('keyword');

      setSearchParams(searchParams);
    }, 350),
    []
  );

  return (
    <TextField
      onChange={handleSearchDebounce}
      placeholder="Search"
      defaultValue={searchParams.get('keyword') || ''}
      fullWidth
      sx={{
        borderRadius: 2,
        marginBottom: 2,
        boxShadow: '0px 4px 18px -4px rgba(16, 24, 40, 0.12)',
        bgcolor: 'grey.300',
        input: { cursor: 'pointer' },
        '& ::placeholder': { fontSize: 'large' }
      }}
      slotProps={{
        input: {
          endAdornment: <Search sx={{ color: 'grey.500', cursor: 'pointer' }} />,
          sx: (theme) => ({
            cursor: 'pointer',
            borderRadius: 2,
            padding: theme.spacing(2, 1)
          })
        }
      }}
    />
  );
};

export default SearchBar;
