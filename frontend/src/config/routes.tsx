import { EBasicRoutes } from '../enums/routes';
import { RoomsPage } from '../pages/RoomsPage/RoomsPage';
import { ReservationsPage } from '../pages/ReservationsPage/ReservationsPage';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { RoomDetailPage } from '../pages/RoomDetailPage/RoomDetailPage';
import {MaintainerPage} from "@/pages/MaintainerPage/MaintainerPage.tsx";

export type RouteType = {
  title: string;
  path: string;
  url: string;
  element: React.ReactNode;
};

export const navigations: RouteType[] = [
  {
    title: 'Rooms',
    path: EBasicRoutes.ROOMS,
    url: EBasicRoutes.ROOMS,
    element: <RoomsPage />,
  },
  {
    title: 'Reservations',
    path: EBasicRoutes.RESERVATIONS,
    url: EBasicRoutes.RESERVATIONS,
    element: <ReservationsPage />,
  },
];

export const additionalRoutes: RouteType[] = [
  {
    title: 'Room Detail',
    path: EBasicRoutes.ROOM_DETAIL,
    url: EBasicRoutes.ROOMS,
    element: <RoomDetailPage />,
  },
];

export const maintainerRoutes: RouteType[] = [
  {
    title: 'Users',
    path: EBasicRoutes.USERS,
    url: EBasicRoutes.USERS,
    element: <UsersPage />,
  },
  {
    title: "Maintainer Dashboard",
    path: EBasicRoutes.MAINTAINER_DASHBOARD,
    url: EBasicRoutes.MAINTAINER_DASHBOARD,
    element: <MaintainerPage />,
  },
];
