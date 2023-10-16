import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Error from './Error';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
