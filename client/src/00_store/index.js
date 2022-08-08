import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../01_reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;