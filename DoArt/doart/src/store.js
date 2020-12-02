import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {paintListReducer, paintDetailsReducer} from './reducers/paintReducers'


const initialState= {}
const reducer= combineReducers({
    paintList: paintListReducer,
    paintDetails: paintDetailsReducer

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;