import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MaintainerRoute } from "./components/MaintainerRoute";
import { generateRoutes } from "./utils/routeUtils";
import {navigations, additionalRoutes, maintainerRoutes} from "./config/routes";
import { EBasicRoutes } from "./enums/routes";
import Page404 from "./pages/Page404";
import { GlobalStyles } from './styles/GlobalStyles';
import "./index.css";
import { LoginPage } from './pages/LoginPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<Router future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true
			}}>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route element={<AppLayout />}>
						<Route element={<ProtectedRoute />}>
							{generateRoutes(navigations)}
							{generateRoutes(additionalRoutes)}
							{generateRoutes(maintainerRoutes)}
							<Route path={EBasicRoutes.ROOT} element={<Navigate to={EBasicRoutes.ROOMS} />} />
							<Route path={EBasicRoutes.NOT_FOUND} element={<Page404 />} />
						</Route>

						{/* Maintainer-Specific Route */}
						<Route element={<MaintainerRoute />}>
							{generateRoutes(maintainerRoutes)}
						</Route>
					</Route>
				</Routes>
			</Router>
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
