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
import { addBoard, fetchData, logoutUser } from "../store/usersReducer";
import type { Board, User } from "../utils/type";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../components/ModalDelete";

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
	const [isDelete, setIsDelete] = useState("");
	const [isStarred, setIsStarred] = useState(false);
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
		setIsStarred(false);
	};
	const handleEdit = (board: Board): void => {
		setIsEdit(board);
		handleOpenModalAdd();
	};
	const handleOpenModalDelete = (id: string) => {
		setIsDelete(id);
	};
	const handleCloseModalDelete = (): void => {
		setIsDelete("");
	};
	const onDelete = (): void => {
		if (currentUser) {
			const currentUserUpdates: User = {
				...currentUser,
				boards: currentUser?.boards.filter((b) => b.id !== isDelete),
			};
			dispatch(addBoard(currentUserUpdates));
		}
		handleCloseModalDelete();
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
					isStarred={isStarred}
				></ModalAddEditBoard>
			)}
			{isDelete && (
				<ModalDelete
					handleClose={handleCloseModalDelete}
					onDelete={onDelete}
				></ModalDelete>
			)}
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
						{currentUser?.boards
							.filter((board) => !board.is_starred)
							.map((board) => (
								<DashboardCartItem
									key={board.id}
									board={board}
									handleEdit={() => handleEdit(board)}
									handleDelete={() => handleOpenModalDelete(board.id)}
									onClick={() => navigate(`/board/${board.id}`)}
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
						<div className="grid grid-cols-4 gap-3 mt-5 max-sm:grid-cols-2">
							{currentUser?.boards
								.filter((board) => board.is_starred)
								.map((board) => (
									<DashboardCartItem
										key={board.id}
										board={board}
										handleDelete={() => handleOpenModalDelete(board.id)}
										handleEdit={() => handleEdit(board)}
										onClick={() => navigate(`/starred-board/${board.id}`)}
									></DashboardCartItem>
								))}
							<DashboardCartAdd
								handleAdd={() => {
									setIsStarred(true);
									handleOpenModalAdd();
								}}
							></DashboardCartAdd>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
