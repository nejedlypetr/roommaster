import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { jwtDecode } from 'jwt-decode';
import { EBasicRoutes } from '@/enums/routes';

type TJwtPayload = {
  exp: number;
}

export const useSessionManager = () => {
  const { token, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode<TJwtPayload>(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      if (timeUntilExpiry <= 0) {
        // Token has expired
        logout().then(() => navigate(EBasicRoutes.LOGIN));
        return;
      }

      // Set timeout to logout when token expires
      const logoutTimer = setTimeout(() => {
        logout().then(() => navigate(EBasicRoutes.LOGIN));
      }, timeUntilExpiry);

      return () => clearTimeout(logoutTimer);
    } catch (error) {
      console.error('Token decode error:', error);
      logout().then(() => navigate(EBasicRoutes.LOGIN));
    }
  }, [token, logout, navigate]);
}; 