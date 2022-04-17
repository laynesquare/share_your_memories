import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';

import { mainTheme } from './themes/mainTheme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
