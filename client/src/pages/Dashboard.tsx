import { Header } from "../components/Header";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { DashboardCartItem } from "../components/DashboardCartItem";
import { DashboardCartAdd } from "../components/DashboardCartAdd";
import { Sidebar } from "../components/Sidebar";
import { SidebarMobile } from "../components/SidebarMobile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { ModalAddEditBoard } from "../components/ModalAddEditBoard";
import { fetchData, logoutUser } from "../store/usersReducer";
import type { Board } from "../utils/type";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const { currentUserId, users } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	const [openSidebar, setOpenSidebar] = useState(false);
	const [isEdit, setIsEdit] = useState<Board | null>(null);
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const toggleSidebarMobile = (): void => {
		setOpenSidebar(!openSidebar);
	};
	const handleOpenModalAdd = (): void => {
		setOpenModalAdd(true);
	};
	const handleCloseModalAdd = (): void => {
		setOpenModalAdd(false);
		setIsEdit(null);
	};
	const handleEdit = (board: Board): void => {
		setIsEdit(board);
		handleOpenModalAdd();
	};
	const handleLogout = (): void => {
		dispatch(logoutUser());
		navigate("/login");
	};
	return (
		<div className="relative h-screen w-screen bg-gray-100 flex flex-col">
			{openModalAdd && (
				<ModalAddEditBoard
					handleClose={handleCloseModalAdd}
					isEdit={isEdit}
				></ModalAddEditBoard>
			)}
			{/* <ModalDelete></ModalDelete> */}
			<Header openSidebarMobile={toggleSidebarMobile}></Header>
			{/* Body chia 2 cột */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar trái */}
				<Sidebar handleLogout={handleLogout}></Sidebar>

				{/*Sidebar cho mobile*/}
				{openSidebar && (
					<SidebarMobile
						closeSidebarMobile={toggleSidebarMobile}
					></SidebarMobile>
				)}

				{/* Content chính */}
				<div className="flex-1 p-4 overflow-y-auto bg-white h-full">
					{/* Title */}
					<div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
						<div className="flex items-center gap-1">
							<FormatListBulletedIcon fontSize="large" />
							<div className="text-[32px] text-[#212529]">Your Workspaces</div>
						</div>
						<div className="flex gap-2 items-center">
							<div className="flex gap-2">
								<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
									Share
								</button>
								<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
									Export
								</button>
							</div>
							<button>This Week</button>
						</div>
					</div>

					{/* Workspace boards */}
					<div className="p-2 grid grid-cols-4 gap-3 mt-3 max-sm:grid-cols-2">
						{currentUser?.boards.map((board) => (
							<DashboardCartItem
								key={board.id}
								board={board}
								handleEdit={() => handleEdit(board)}
							></DashboardCartItem>
						))}
						<DashboardCartAdd handleAdd={handleOpenModalAdd}></DashboardCartAdd>
					</div>

					{/* Starred boards */}
					<div className="mt-3">
						<div className="flex items-center gap-1 border-b-2 border-b-gray-200 py-2">
							<StarBorderIcon fontSize="large" />
							<div className="text-[28px] text-[#212529]">Starred Boards</div>
						</div>
						<div className="grid grid-cols-4 gap-3 mt-5 max-sm:grid-cols-2"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
