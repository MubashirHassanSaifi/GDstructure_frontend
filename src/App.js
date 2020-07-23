import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import socketIoClient from 'socket.io-client';
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider

} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Auth from 'src/components/Auth';
import CookiesNotification from 'src/components/CookiesNotification';
import SettingsNotification from 'src/components/SettingsNotification';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import ScrollReset from 'src/components/ScrollReset';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import Routes from 'src/Routes';
import { connectSocket } from 'src/store/actions/socketAction';
// import { adminAuth } from 'src/store/actions/adminAction';


const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();

  const dispatch = useDispatch();
  const socket = socketIoClient(`${process.env.REACT_APP_URL}`);
  useEffect(() => {
    // dispatch(adminAuth());
    dispatch(connectSocket(socket));
  }, []);

  const { settings } = useSettings();

  return (

    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            maxSnack={7}
            preventDuplicate
          >
            <Router history={history}>
              <Auth>
                <ScrollReset />
                <GoogleAnalytics />
                <CookiesNotification />
                <SettingsNotification />
                <Routes />
              </Auth>
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
