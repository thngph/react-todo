import { styled, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router';
import { SEARCH_PARAM_KEY } from '../../constants/key';

const defaultOptions = ['TODO', 'DONE'];
type FilterBarProps = {
  _options?: string[];
};

const _ALL = 'ALL';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  alignSelf: 'flex-start',
  padding: theme.spacing(0, 2),

  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
    minWidth: '65px',
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0
    }
  },

  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
    marginLeft: -1,
    borderLeft: '1px solid transparent'
  }
}));

export const FilterBar = (props: FilterBarProps) => {
  const { _options: options = defaultOptions } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBy, setFilteredBy] = React.useState(_ALL);

  const handleChange = (_option: string) => {
    const option = _option ? _option : _ALL;
    setFilteredBy(option);

    searchParams.set(SEARCH_PARAM_KEY.FILTER, option);

    setSearchParams(searchParams);
  };

  return (
    <StyledToggleButtonGroup
      color="primary"
      value={filteredBy}
      exclusive
      onChange={(_, newStatus: string) => handleChange(newStatus)}
      aria-label="Filter"
      size="small"
    >
      <ToggleButton key={_ALL} value={_ALL} sx={{ borderRadius: 3 }}>
        ALL
      </ToggleButton>
      {options.map((option) => (
        <ToggleButton key={option} value={option} sx={{ borderRadius: 3 }}>
          {option}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default FilterBar;
