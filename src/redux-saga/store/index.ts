import { createLogger } from 'redux-logger'
import createSagaMiddleware from '@redux-saga/core'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer'
import rootSaga from '../saga'

const logger = createLogger()
const saga = createSagaMiddleware()
const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(saga, logger))
)

saga.run(rootSaga);

export default store;
