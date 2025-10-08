import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { Board } from "../pages/Board";
import { MainBoard } from "../components/MainBoard";
import { StarredBoard } from "../pages/StarredBoard";

export const router = createBrowserRouter([
	{ path: "/register", element: <RegisterPage></RegisterPage> },
	{ path: "/login", element: <LoginPage></LoginPage> },
	{ path: "/dashboard", element: <Dashboard></Dashboard> },
	{
		path: `/board`,
		element: <Board></Board>,
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
	{
		path: "/starred-board",
		element: <StarredBoard></StarredBoard>,
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
]);
