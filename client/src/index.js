import { createStore, applyMiddleware, compose } from 'redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { mainTheme } from './themes/mainTheme.js';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reducers from './reducers';
import thunk from 'redux-thunk';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ThemeProvider>
  </Provider>
);
