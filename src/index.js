import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/assets/css/prism.css';
import 'src/mixins/chartjs';
import 'src/mixins/prismjs';
import 'src/mock';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'src/serviceWorker';
import { SettingsProvider } from 'src/context/SettingsContext';
import { restoreSettings } from 'src/utils/settings';
import App from 'src/App';
// import { CircularProgress } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './store';

enableES5();

const { store, persistor } = configureStore();
const settings = restoreSettings();

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider settings={settings}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </SettingsProvider>


  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
