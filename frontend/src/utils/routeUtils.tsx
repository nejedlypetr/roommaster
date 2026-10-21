import { Route } from "react-router-dom";
import { RouteType } from "../config/routes";

export function generateRoutes(routes: RouteType[]) {
	return routes.map((route) => <Route key={route.path} path={route.path} element={route.element} />);
}
