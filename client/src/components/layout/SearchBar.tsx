import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router';
import useDebounce from '../../hooks/useDebounce';
import { DEFAULT } from '../../constants/default';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchDebounce = React.useCallback(
    useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = ev.target.value.trim();

      if (keyword) searchParams.set('keyword', keyword);
      else searchParams.delete('keyword');

      setSearchParams(searchParams);
    }, DEFAULT.INPUT_DEBOUNCE),
    []
  );

  return (
    <TextField
      onChange={handleSearchDebounce}
      placeholder="Search"
      defaultValue={searchParams.get('keyword') || ''}
      fullWidth
      sx={(theme) => ({
        borderRadius: 8,
        input: { cursor: 'pointer', padding: theme.spacing(1, 2) },
        '& ::placeholder': { fontSize: 'large' }
      })}
      slotProps={{
        input: {
          endAdornment: <Search sx={{ color: 'grey.500', cursor: 'pointer' }} />,
          sx: {
            cursor: 'pointer',
            borderRadius: 8
          }
        }
      }}
    />
  );
};

export default SearchBar;
