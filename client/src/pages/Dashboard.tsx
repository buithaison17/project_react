import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import { ModalAddEditBoard } from "../components/ModalAddEditBoard";
import { ModalDelete } from "../components/ModalDelete";
import { Sidebar } from "../components/Sidebar";
import { SidebarMobile } from "../components/SidebarMobile";
import { addBoard, fetchData, logoutUser } from "../store/usersReducer";
import { Outlet, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import type { Board, User } from "../utils/type";

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
	const [openModalAdd, setOpenModalAdd] = useState(false);

	const toggleSidebarMobile = () => setOpenSidebar(!openSidebar);
	const handleOpenModalAdd = () => setOpenModalAdd(true);
	const handleCloseModalAdd = () => {
		setOpenModalAdd(false);
		setIsEdit(null);
	};
	const handleEdit = (board: Board) => {
		setIsEdit(board);
		handleOpenModalAdd();
	};
	const handleOpenModalDelete = (id: string) => setIsDelete(id);
	const handleCloseModalDelete = () => setIsDelete("");

	const onDelete = () => {
		if (currentUser) {
			const updatedUser: User = {
				...currentUser,
				boards: currentUser.boards.filter((b) => b.id !== isDelete),
			};
			dispatch(addBoard(updatedUser));
		}
		handleCloseModalDelete();
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<div className="relative h-screen w-screen bg-gray-100 flex flex-col">
			{openModalAdd && (
				<ModalAddEditBoard handleClose={handleCloseModalAdd} isEdit={isEdit} />
			)}
			{isDelete && (
				<ModalDelete handleClose={handleCloseModalDelete} onDelete={onDelete} />
			)}

			<Header openSidebarMobile={toggleSidebarMobile} />

			<div className="flex flex-1 overflow-hidden">
				<Sidebar handleLogout={handleLogout} />

				{openSidebar && (
					<SidebarMobile closeSidebarMobile={toggleSidebarMobile} />
				)}

				<Outlet
					context={{
						currentUser,
						handleEdit,
						handleOpenModalDelete,
						handleOpenModalAdd,
					}}
				></Outlet>
			</div>
		</div>
	);
};
