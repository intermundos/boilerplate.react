import {createStore, compose, applyMiddleware}    from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootDuck from '../reducers/index'
import rootSaga from '../sagas/index'

const configureStore = () => {

  const logger = createLogger()
  const saga = createSagaMiddleware()
  const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

  let middleware = applyMiddleware(logger, saga)

  const store = createStore(
    rootDuck,
    process.env.NODE_ENV !== window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnchancers(middleware)
  )

  saga.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const newReducer = require('../reducers/index').default
      store.replaceReducer(newReducer)
    })
  }

  return store
}

export default configureStore