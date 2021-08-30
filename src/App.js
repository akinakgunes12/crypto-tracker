import React from 'react';
import CoinMarketPage from './pages/CoinMarketPage';
import theme from './theme';
import Header from './Components/Header&Footer/Header/Header';
import Footer from './Components/Header&Footer/Footer';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#2E3880',
    color: 'white',
  },
  appPage: {
    maxWidth: '1500px',
    margin: 'auto',
  },
}));
const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.appPage}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/coinmarket" component={CoinMarketPage} exact />
            </Switch>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
