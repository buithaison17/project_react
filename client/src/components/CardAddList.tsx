import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addBoard, fetchData } from "../store/usersReducer";
import { useParams } from "react-router-dom";
import type { List, User } from "../utils/type";
import { getDateNow } from "../utils/getDateNow";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const CardAddList = () => {
	const [isAddList, setIsAddList] = useState(false);
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	const handleOpenAddList = (): void => {
		setIsAddList(true);
	};
	const handleCloseAddList = (): void => {
		setIsAddList(false);
		setInput("");
	};
	const [input, setInput] = useState("");
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	const onAddList = (): void => {
		if (!input.trim()) {
			toast.error("Tên danh sách công việc không được để trông");
			return;
		}
		const newList: List = {
			id: Math.floor(Math.random() * 1000000).toString(),
			title: input.trim(),
			created_at: getDateNow(),
			tasks: [],
		};
		if (currentUser) {
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === id
						? {
								...board,
								list: [...board.list, newList],
						  }
						: board
				),
			};
			dispatch(addBoard(updates));
			handleCloseAddList();
		}
	};
	return (
		<div>
			{!isAddList && (
				<div
					onClick={handleOpenAddList}
					className="flex p-3 gap-2 items-center bg-[#F1F2F4] cursor-pointer rounded-xl h-[44px]"
				>
					<AddIcon fontSize="small"></AddIcon>
					<div className="font-medium text-[14px] text-[#172B4D]">
						Add another list
					</div>
				</div>
			)}
			{isAddList && (
				<div className="p-2 rounded-xl bg-[#F1F2F4] shadow flex flex-col gap-2 w-[272px]">
					<input
						value={input}
						onChange={handleInput}
						type="text"
						className="w-full h-[32px] rounded-md text-[#626F86] text-[14px] font-semibold p-3 border hover:border-blue-500 focus:border-blue-500 focus:outline-none"
						placeholder="Enter list name…"
					/>
					<div className="flex gap-2 items-center">
						<button
							onClick={onAddList}
							className="px-2 py-1 bg-blue-500 text-white rounded"
						>
							Add list
						</button>
						<div onClick={handleCloseAddList} className="cursor-pointer">
							<CloseIcon fontSize="small"></CloseIcon>
						</div>
					</div>
				</div>
			)}
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
