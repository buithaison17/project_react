import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { Board } from "../pages/Board";

export const router = createBrowserRouter([
	{ path: "/register", element: <RegisterPage></RegisterPage> },
	{ path: "/login", element: <LoginPage></LoginPage> },
	{ path: "/dashboard", element: <Dashboard></Dashboard> },
	{ path: "/board", element: <Board></Board> },
]);
