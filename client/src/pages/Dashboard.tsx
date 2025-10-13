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
import { Bounce, toast, ToastContainer } from "react-toastify";
import { getDateNow } from "../utils/getDateNow";

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
			toast.success("Xóa board thành công");
			dispatch(addBoard(updatedUser));
		}
		handleCloseModalDelete();
	};

	const onAdd = (data: { title: string; backdrop: string }): void => {
		if (!data.title.trim()) {
			toast.error("Tiêu đề không được để trống");
			return;
		}
		if (!currentUser) return;
		if (!isEdit) {
			const board: Board = {
				id: Math.floor(Math.random() * 1000000).toString(),
				title: data.title.trim(),
				backdrop: data.backdrop,
				list: [],
				created_at: getDateNow() as string,
				type: "normal",
				description: "",
			};
			const updates: User = {
				...currentUser,
				boards: [...currentUser.boards, board],
			};
			toast.success("Thêm board thành công");
			dispatch(addBoard(updates));
		} else {
			const boardUpdates: Board = {
				...isEdit,
				title: data.title.trim(),
				backdrop: data.backdrop,
			};
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === isEdit.id ? boardUpdates : board
				),
			};
			toast.success("Sửa board thành công");
			dispatch(addBoard(updates));
		}
		handleCloseModalAdd();
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<div className="relative h-screen w-screen bg-gray-100 flex flex-col">
			{openModalAdd && (
				<ModalAddEditBoard
					onAdd={onAdd}
					handleClose={handleCloseModalAdd}
					isEdit={isEdit}
				/>
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
			<ToastContainer
				position="top-left"
				autoClose={1200}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</div>
	);
};
