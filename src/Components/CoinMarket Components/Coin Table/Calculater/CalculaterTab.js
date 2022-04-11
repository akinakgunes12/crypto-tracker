import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div>
//       <Box p={3}>
//         <Typography>{children}</Typography>
//       </Box>
//     </div>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1em',
  },
  tabs: {
    color: theme.palette.common.pink2,
  },
  bigIndicator: {
    borderRadius: '1em',
    minWidth: '10em',
    backgroundColor: theme.palette.common.blue1,
  },
}));

const CalculaterTab = ({ value, setValue }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{ indicator: classes.bigIndicator }}
      >
        <Tab label="Currency Account" />

        <Tab label="Curreny to Currency" />
      </Tabs>
    </div>
  );
};
export default CalculaterTab;
