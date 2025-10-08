import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import Frame from "../assets/images/frame.png";
import type { List, Task, User } from "../utils/type";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { addBoard, fetchData } from "../store/usersReducer";
import { ModalDelete } from "./ModalDelete";

interface PropsType {
	list: List;
}

export const ListCard = ({ list }: PropsType) => {
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	const [isAddTask, setIsAddTask] = useState(false);
	const [isEdit, setIsEdit] = useState<null | List>(null);
	const [isDelete, setIsDelete] = useState("");
	const handleOpenAddCart = (): void => {
		setIsAddTask(true);
	};
	const handleCloseAddCart = (): void => {
		setIsAddTask(false);
		setInput("");
	};
	const [input, setInput] = useState("");
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	const onAddTask = (idTask: string): void => {
		if (!input.trim()) return;
		const newTask: Task = {
			id: Math.floor(Math.random() * 1000000).toString(),
			title: input.trim(),
			status: "pending",
			due_date: "",
			description: "",
			tag: [],
		};
		if (currentUser) {
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === id
						? {
								...board,
								list: board.list.map((item) =>
									item.id === idTask
										? {
												...item,
												tasks: [...item.tasks, newTask],
										  }
										: item
								),
						  }
						: board
				),
			};
			dispatch(addBoard(updates));
			handleCloseAddCart();
		}
	};
	const handleOpenEditList = (list: List): void => {
		setIsEdit(list);
		setInput(list.title);
	};
	const handleCloseEditList = (): void => {
		setIsEdit(null);
		setInput("");
	};
	const onEdit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key !== "Enter") return;
		if (!input.trim()) return;
		if (!isEdit) return;
		if (!currentUser) return;
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === id
					? {
							...board,
							list: board.list.map((list) =>
								list.id === isEdit.id
									? {
											...list,
											title: input.trim(),
									  }
									: list
							),
					  }
					: board
			),
		};
		dispatch(addBoard(updates));
		handleCloseEditList();
	};
	const handleOpenDeleteList = (id: string): void => {
		setIsDelete(id);
	};
	const handleCloseDeleteList = (): void => {
		setIsDelete("");
	};
	const onDelete = (): void => {
		if (!currentUser) return;
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === id
					? {
							...board,
							list: board.list.filter((list) => list.id !== isDelete),
					  }
					: board
			),
		};
		dispatch(addBoard(updates));
		handleCloseDeleteList();
	};
	return (
		<div className="bg-[#F1F2F4] rounded-md p-3">
			<div className="flex items-center justify-between">
				{!isEdit && (
					<div
						onClick={() => handleOpenEditList(list)}
						className="text-[14px] text-[#172B4D] font-bold flex-1"
					>
						{list.title}
					</div>
				)}
				{isEdit && (
					<input
						onKeyDown={onEdit}
						onChange={handleInput}
						value={input}
						type="text"
						className="w-[220px] h-[32px] border border-[#8590A2] px-3 rounded hover:border-blue-500 focus:border-blue-500 outline-none"
					/>
				)}
				<MoreHorizIcon fontSize="small"></MoreHorizIcon>
			</div>
			<div className="mt-3 flex flex-col gap-1">
				{list.tasks.map((task) => (
					<div
						key={task.id}
						className="flex gap-1 items-center bg-white px-2 py-1 shadow rounded-md"
					>
						{task.status === "success" && (
							<CheckCircleIcon
								className="text-green-500"
								fontSize="small"
							></CheckCircleIcon>
						)}
						<div>{task.title}</div>
					</div>
				))}
			</div>
			{!isAddTask && (
				<div className="mt-4 flex justify-between items-center">
					<div className="flex gap-1 items-center">
						<AddIcon fontSize="small"></AddIcon>
						<div
							onClick={handleOpenAddCart}
							className="text-[14px] text-[#44546F] hover:underline cursor-pointer"
						>
							Add a cart
						</div>
					</div>
					<img
						onClick={() => handleOpenDeleteList(list.id)}
						src={Frame}
						className="w-[16px] h-[16px] object-cover object-center"
						alt=""
					/>
				</div>
			)}
			{isAddTask && (
				<div className="flex flex-col gap-2">
					<input
						type="text"
						className="h-[56px] rounded-lg shadow w-full p-2 text-[#626F86] text-[14px] border hover:border-blue-500 focus:border-blue-500 focus:outline-none"
						placeholder="Enter a title or paste a link"
						value={input}
						onChange={handleInput}
					/>
					<div className="flex gap-2 items-center">
						<button
							onClick={() => onAddTask(list.id)}
							className="px-2 py-1 bg-blue-500 text-white rounded"
						>
							Add card
						</button>
						<div onClick={handleCloseAddCart} className="cursor-pointer">
							<CloseIcon fontSize="small"></CloseIcon>
						</div>
					</div>
				</div>
			)}
			{isDelete && (
				<ModalDelete onDelete={onDelete} handleClose={handleCloseDeleteList}></ModalDelete>
			)}
		</div>
	);
};
