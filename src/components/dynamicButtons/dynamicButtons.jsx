import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    marginRight: '8px',
    color: '#555',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&.Mui-selected': {
      backgroundColor: '#2962FF',
      color: '#fff',
    },
  },
});

const JobFilterButtons = ({ selectedFilter, onSelectFilter }) => {
  const classes = useStyles();
  const filters = ['All', 'Open', 'Pending', 'Completed', 'Cancelled', 'Expired'];

  return (
    <ButtonGroup variant="outlined">
      {filters.map((filter) => (
        <Button
          key={filter}
          className={`${classes.button} ${selectedFilter === filter && 'Mui-selected'}`}
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default JobFilterButtons;
