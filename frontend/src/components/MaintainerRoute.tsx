import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { useSessionManager } from '@/hooks/useSessionManager';
import { EBasicRoutes } from '@/enums/routes';

export function MaintainerRoute() {
  const { token, role } = useStore();
  useSessionManager();

  if (!token) {
    return <Navigate to={EBasicRoutes.LOGIN} />;
  }

  if (role !== "MAINTAINER") {
    return <Navigate to={EBasicRoutes.NOT_FOUND} />;
  }

  return <Outlet />;
}

