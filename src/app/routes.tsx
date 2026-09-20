import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './routes/Login';
import { Home } from './routes/Home';
import { WineList } from './routes/WineList';
import { AddWine } from './routes/AddWine';
import { EditWine } from './routes/EditWine';
import { TrackOrders } from './routes/TrackOrders';
import { WineAI } from './routes/WineAI';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/cellar',
    Component: WineList,
  },
  {
    path: '/add',
    Component: AddWine,
  },
  {
    path: '/edit/:id',
    Component: EditWine,
  },
  {
    path: '/orders',
    Component: TrackOrders,
  },
  {
    path: '/ai',
    Component: WineAI,
  },
]);
