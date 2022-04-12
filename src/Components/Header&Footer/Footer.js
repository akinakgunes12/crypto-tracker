import React from 'react';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.primary.main,
  },
  copyTextGrid: {
    padding: '1em 0em 1em 3em ',
  },
  '@media (max-width: 501px)': {
    copyTextGrid: {
      paddingRight: '3em',
    },
  },

  text: {
    fontSize: '0.8em',
  },
  logos: {
    paddingRight: '3em',
  },
  '@media (max-width: 500px)': {
    logos: {
      paddingRight: '0em',
    },
  },

  logo: {
    '&:hover': {
      color: theme.palette.common.pink2,
      cursor: 'pointer',
    },
    fontSize: '1.2em',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const matches500 = useMediaQuery('(max-width:500px)');

  return (
    <>
      {/*footer main grid */}
      <Grid
        container
        display="flex"
        justify="space-between"
        alignItems="center"
        className={classes.main}
        direction={matches500 ? 'column' : 'row'}
      >
        {/*left text */}
        <Grid className={classes.copyTextGrid}>
          <Typography className={classes.text}>
            Copyright© 2021 CoinOne{' '}
          </Typography>
        </Grid>
        {/*right logos */}
        <Grid className={classes.logos}>
          <TwitterIcon className={classes.logo} />
          <InstagramIcon className={classes.logo} />
          <FacebookIcon className={classes.logo} />
          <YouTubeIcon className={classes.logo} />
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
