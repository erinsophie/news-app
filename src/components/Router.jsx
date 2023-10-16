import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Error from './Error';

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
        {
          path: '/search',
          element: <SearchResults />,
        },
        {
          path: '/:category',
          element: <News />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;