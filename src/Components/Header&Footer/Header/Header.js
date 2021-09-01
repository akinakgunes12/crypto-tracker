import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { Button, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  Main: {
    backgroundColor: theme.palette.primary.main,
    marginTop: '1.5em',
    marginBottom: '1.5em',
    paddingLeft: '3em',
    paddingRight: '3em',
  },
  tabs: {
    maxWidth: '100%',
  },
  tab: {
    fontSize: '1em',
    '&:hover': {
      color: theme.palette.common.pink2,
      cursor: 'pointer',
    },
  },
  coinOne: {
    color: theme.palette.common.white,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: '1.8em',
  },

  tabRoot: {
    minWidth: '5em',
  },
  logo: {
    color: theme.palette.common.pink2,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);

  // Bug Fix : Pathname & Tab Value Syncronize
  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setTabValue(0);
        break;
      case '/coinmarket':
        setTabValue(1);
        break;
      case '/portfolio':
        setTabValue(2);
        break;
      case '/contact':
        setTabValue(3);
        break;
      case '/login':
        setTabValue(4);
        break;
      default:
        setTabValue(0);
        break;
    }
  }, [tabValue]);

  // Dom Handlers
  const logoHandler = () => {
    history.push('/');
    setTabValue(0);
  };
  const tabsHandler = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container direction="row" className={classes.Main}>
        {/* Logo */}
        <Grid item container xs={3} justify="flex-start" alignItems="center">
          <Button className={classes.coinOne} onClick={logoHandler}>
            Coin<span className={classes.logo}>ONE</span>
          </Button>
        </Grid>

        {/* Tabs */}
        <Grid item container xs={9} justify="flex-end" alignItems="center">
          <Hidden smDown>
            <Tabs
              className={classes.tabs}
              indicatorColor="secondary"
              value={tabValue}
              onChange={tabsHandler}
            >
              <Tab
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
                label="Home"
                component={Link}
                to="/"
              />
              <Tab
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
                label="Coin Market"
                component={Link}
                to="/coinmarket"
              />
              <Tab
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
                label="Portfolio"
                component={Link}
                to="/portfolio"
              />
              <Tab
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
                label="Contact"
                component={Link}
                to="/contact"
              />
              <Tab
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
                label="Login"
                component={Link}
                to="/login"
              />
            </Tabs>
          </Hidden>
          <Hidden mdUp>
            <HeaderMenu tabValue={tabValue} setTabValue={setTabValue} />
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
