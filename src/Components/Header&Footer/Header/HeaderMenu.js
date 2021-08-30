import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.pinkblue,
  },
  paperMenu: {
    backgroundColor: theme.palette.common.pinkblue,
  },

  tab: {
    '&:hover': {
      color: theme.palette.common.pink2,
      cursor: 'pointer',
    },
  },
  buttonMenu: {
    color: theme.palette.common.white,
    textTransform: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.common.pink2,
    },
  },
}));

const HeaderMenu = ({ tabValue, setTabValue }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  //handle functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const tabsHandler = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.main}>
      <Button onClick={handleClick} className={classes.buttonMenu}>
        Open Menu <PaymentIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menuHeader}
        classes={{ paper: classes.paperMenu }}
      >
        <Tabs
          classes={{ indicator: classes.indicatorTab }}
          className={classes.Tabs}
          value={tabValue}
          onChange={tabsHandler}
          orientation="vertical"
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
      </Menu>
    </div>
  );
};

export default HeaderMenu;
