import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './app.reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export { store };
