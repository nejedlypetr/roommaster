import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { useSessionManager } from '@/hooks/useSessionManager';
import { EBasicRoutes } from '@/enums/routes';

export function ProtectedRoute() {
  const { token } = useStore();
  useSessionManager();

  if (!token) {
    return <Navigate to={EBasicRoutes.LOGIN} />;
  }

  return <Outlet />;
}

