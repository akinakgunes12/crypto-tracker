import InputBase from '@material-ui/core/InputBase';
import CoinCurrencyCal from './Coin Table/Calculater/CoinCurrencyCal';

import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: '3em',
    paddingRight: '3em',
    marginTop: '1em',
  },
  '@media (max-width: 440px)': {
    main: {
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
    },
  },
  main2: {
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.light,
    marginTop: '0.5em',
    marginBottom: '0.5em',
    padding: '0 1em 1em',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const AppBarCoins = ({
  searchTerm,
  setSearchTerm,
  setFavoriteCheck,
  coins,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.main}>
      <Grid item container alignItems="center" className={classes.main2}>
        {/* Search Button */}
        <Grid
          item
          container
          justify="center"
          xs={12}
          md={6}
          style={{ marginTop: '1em' }}
        >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Grid>
        {/* Favorites CheckBox  */}
        <Grid
          item
          container
          justify="center"
          xs={6}
          md={3}
          style={{ marginTop: '1em' }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Favorites"
            onChange={(event) => setFavoriteCheck(event.target.checked)}
          />
        </Grid>

        {/* Calculater Popover */}
        <Grid
          item
          container
          justify="center"
          xs={6}
          md={3}
          style={{ borderRadius: '50px', marginTop: '1em' }}
        >
          <CoinCurrencyCal coins={coins} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AppBarCoins;
