import FilterListIcon from "@mui/icons-material/FilterList";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { FilterDropdown } from "../components/FilterDropdown";
import BoardIcon from "../assets/images/board-icon.png";
import TableBoardIcon from "../assets/images/table-board.png";
import CloseTable from "../assets/images/close-table.png";
import { ListCard } from "../components/ListCard";
import { CardAddList } from "./CardAddList";
import { ModalDelete } from "./ModalDelete";
import { Bounce, toast, ToastContainer } from "react-toastify";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addBoard, fetchData } from "../store/usersReducer";
import { useNavigate, useParams } from "react-router-dom";
import type { Board, User } from "../utils/type";

export const MainBoard = () => {
	const { currentUserId, users } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const { id } = useParams();
	const currentUser = users.find((user) => user.id === currentUserId);
	const currentBoard = currentUser?.boards.find((board) => board.id === id);
	const [openFilter, setOpenFilter] = useState(false);
	const [filterInput, setFilterInput] = useState({
		search: "",
		status: "",
		dueDate: "",
	});
	const handleToggleFilter = (): void => setOpenFilter(!openFilter);
	const [closeBoard, setCloseBoard] = useState(false);
	const handleCloseBoard = (): void => setCloseBoard(!closeBoard);
	const onCloseBoard = (): void => {
		if (!currentUser || !currentBoard) return;
		const updatedBoard: Board = { ...currentBoard, type: "close" };
		const temp: Board = { ...currentBoard };
		const updatedUser: User = {
			...currentUser,
			boards: currentUser.boards.map((b) => (b.id === id ? updatedBoard : b)),
		};
		toast.success("Đóng board thành công");
		dispatch(addBoard(updatedUser));
		handleCloseBoard();
		switch (temp.type) {
			case "normal":
				navigate("/board");
				break;
			case "starred":
				navigate("/starred-board");
				break;
		}
	};
	const onStarredBoard = (): void => {
		if (!currentUser || !currentBoard) return;
		const newType = currentBoard.type === "starred" ? "normal" : "starred";
		const updatedBoard: Board = {
			...currentBoard,
			type: newType,
		};
		const updatedUser: User = {
			...currentUser,
			boards: currentUser.boards.map((b) => (b.id === id ? updatedBoard : b)),
		};
		toast.success(
			newType === "starred"
				? "Đã thêm vào bảng yêu thích"
				: "Đã bỏ khỏi bảng yêu thích"
		);
		dispatch(addBoard(updatedUser));
		if (newType === "starred") {
			navigate(`/starred-board/${currentBoard.id}`);
		} else {
			navigate(`/board/${currentBoard.id}`);
		}
	};
	const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		if (name === "search") {
			setFilterInput({ ...filterInput, search: value });
		} else if (name === "status") {
			setFilterInput((prev) => ({
				...prev,
				status: prev.status === value ? "" : value,
			}));
		}
	};
	const filterList = useMemo(() => {
		const { search, status } = filterInput;
		if (!currentBoard) return [];
		if (!search.trim() && !status.trim()) return currentBoard.list;
		const lists = currentBoard.list;
		let filter = lists.filter((list) =>
			list.title.toLowerCase().includes(search.toLowerCase().trim())
		);
		if (status) {
			filter = filter.map((list) => ({
				...list,
				tasks: list.tasks.filter((task) => task.status === status),
			}));
		}
		return filter;
	}, [currentBoard, filterInput]);
	return (
		<div className="flex-1 bg-white">
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
			{/* Header */}
			<div className="bg-[#F1F2F4] px-4 py-3 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<div className="text-[18px] font-bold">{currentBoard?.title}</div>

					{/* Gắn sao */}
					<div
						onClick={onStarredBoard}
						className="cursor-pointer hover:opacity-80 transition"
					>
						<StarOutlineIcon
							className={
								currentBoard?.type === "starred" ? "text-yellow-400" : ""
							}
							fontSize="small"
						/>
					</div>

					{/* Nút chuyển giữa view */}
					<div className="flex gap-2 items-center px-2 py-1 bg-[#00000080] rounded-md cursor-pointer">
						<img src={BoardIcon} className="w-[16px] h-[16px]" alt="" />
						<div className="text-white text-[14px]">Board</div>
					</div>

					<div className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer">
						<img src={TableBoardIcon} className="w-[16px] h-[16px]" alt="" />
						<div className="text-[14px]">Table</div>
					</div>

					{/* Đóng board */}
					<div
						onClick={handleCloseBoard}
						className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
					>
						<img src={CloseTable} className="w-[16px] h-[16px]" alt="" />
						<div className="text-[14px]">Close this table</div>
					</div>
				</div>

				{/* Filter */}
				<div className="relative">
					<div
						onClick={handleToggleFilter}
						className="flex gap-2 cursor-pointer"
					>
						<FilterListIcon fontSize="small" />
						<div className="text-[14px] text-[#172B4D] font-medium">
							Filters
						</div>
					</div>
					{openFilter && (
						<FilterDropdown
							filterInput={filterInput}
							handleInput={handleFilterInput}
							toggleFilter={handleToggleFilter}
						/>
					)}
				</div>
			</div>

			{/* Nội dung các list */}
			<div className="grid grid-cols-4 p-3 gap-3 items-start">
				{filterList.map((list) => (
					<ListCard key={list.id} list={list} />
				))}
				<CardAddList />
			</div>

			{/* Modal đóng board */}
			{closeBoard && (
				<ModalDelete handleClose={handleCloseBoard} onDelete={onCloseBoard} />
			)}
		</div>
	);
};
