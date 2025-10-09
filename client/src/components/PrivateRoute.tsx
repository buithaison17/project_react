import type React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoute {
	children: React.ReactNode;
}

const PrivateRouter = ({ children }: PrivateRoute) => {
	const isLogin = localStorage.getItem("currentUserId");
	return isLogin ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRouter;
