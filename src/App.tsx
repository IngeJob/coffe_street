import { BrowserRouter as Router } from 'react-router-dom';
import { AppTheme } from './muiTheme/AppTheme';
import { AppRoutes } from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { hydrate } from './store/client/clientSlice';

const getTodosFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem('reduxState')
    if (persistedState) {
      const res = JSON.parse(persistedState)
      return (res.client)
    }
  } catch (e) {
    console.log(e)
  }
}

const todos = getTodosFromLocalStorage()
if (todos) {
  store.dispatch(hydrate(todos))
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppTheme>
          <AppRoutes />
        </AppTheme>
      </Router>
    </Provider>
  )
}

export default App