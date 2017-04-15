import React                        from 'react'
import ReactDOM                     from 'react-dom'
import { Provider }                 from 'react-redux'
import { BrowserRouter as Router }  from 'react-router-dom'
import configureStore               from './app-logic/store/store'
const store = configureStore()

import Root from './containers/Root'

const App = () =>
  <Provider store={ store }>
    <Router history={ history }>
      <Root />
    </Router>
  </Provider>

ReactDOM.render(<App />, document.getElementById('react'))

if (module.hot) module.hot.accept()