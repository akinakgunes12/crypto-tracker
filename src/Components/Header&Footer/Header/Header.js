import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  Main: {
    backgroundColor: theme.palette.primary.main,

    marginBottom: '1.5em',
    paddingLeft: '3em',
    paddingRight: '3em',
  },

  coinOne: {
    color: theme.palette.common.white,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: '1.8em',
    marginTop: '1.5rem',
  },

  logo: {
    color: theme.palette.common.pink2,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="row" className={classes.Main}>
        {/* Logo */}
        <Grid item container xs={3} justify="flex-start" alignItems="center">
          <div className={classes.coinOne}>
            Coin<span className={classes.logo}>ONE</span>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
