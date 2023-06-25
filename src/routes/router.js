import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Home, Employees, Error } from '../pages/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/employees-list',
        caseSensitive: true,
        element: <Employees />
      },
      {
        path: '*', element: <Error />
      }
    ]
  }
])