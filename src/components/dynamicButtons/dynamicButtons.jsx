import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    padding: '6px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginRight: '8px',
    color: '#555',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    gap: '6px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&.Mui-selected': {
      backgroundColor: '#2962FF',
      color: '#fff',
    },
  },
  selectedButton: {
    backgroundColor: '#2962FF',
    color: '#fff',
    '& svg': {
      color: '#fff',
    },
    '&:hover': {
        backgroundColor: '#2962FF',
        color: '#fff',

    },
  },
  icon: {
    color: '#555',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
});

const JobFilterButtons = ({ selectedFilter, onSelectFilter, filters, icons }) => {
  const classes = useStyles();

  return (
    <ButtonGroup variant="outlined">
      {filters.map((filter) => (
        <Button
          key={filter}
          className={`${classes.button} ${selectedFilter === filter ? classes.selectedButton : ''}`}
          onClick={() => onSelectFilter(filter)}
        >
          <span className={classes.icon}>{icons[filter]}</span>
          {filter}
        </Button>
      ))}
    </ButtonGroup>
  );
};



export default JobFilterButtons;
