import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { Board } from "../pages/Board";
import { MainBoard } from "../components/MainBoard";
import { StarredBoard } from "../pages/StarredBoard";
import { CloseBoard } from "../pages/CloseBoard";
import PrivateRouter from "../components/PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage></LoginPage>,
	},
	{ path: "/register", element: <RegisterPage></RegisterPage> },
	{ path: "/login", element: <LoginPage></LoginPage> },
	{
		path: "/dashboard",
		element: (
			<PrivateRouter>
				<Dashboard></Dashboard>
			</PrivateRouter>
		),
	},
	{
		path: `/board`,
		element: (
			<PrivateRouter>
				<Board></Board>
			</PrivateRouter>
		),
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
	{
		path: "/starred-board",
		element: (
			<PrivateRouter>
				<StarredBoard></StarredBoard>
			</PrivateRouter>
		),
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
	{
		path: "/close-board",
		element: (
			<PrivateRouter>
				<CloseBoard></CloseBoard>
			</PrivateRouter>
		),
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
]);
