import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Error from './Error';
import News from '../pages/News';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <News />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
