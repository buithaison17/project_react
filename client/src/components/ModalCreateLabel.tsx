import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addBoard, fetchData } from "../store/usersReducer";
import type { List, Tag, Task, User } from "../utils/type";
import { useParams } from "react-router-dom";

interface ColorItem {
	color: string;
}

const colorRow: ColorItem[] = [
	{
		color: "#BAF3DB",
	},
	{
		color: "#F8E6A0",
	},
	{
		color: "#FEDEC8",
	},
	{
		color: "#FFD5D2",
	},
	{
		color: "#DFD8FD",
	},
	{
		color: "#4BCE97",
	},
	{
		color: "#F5CD47",
	},
	{
		color: "#FEA362",
	},
	{
		color: "#F87168",
	},
	{
		color: "#9F8FEF",
	},
];

interface Props {
	onClose: (list: List, task: Task) => void;
	list: List;
	task: Task;
	isEdit: {
		task: Task;
		list: List;
		tag: Tag;
	} | null;
}

export const ModalCreateLabel = ({ onClose, list, task, isEdit }: Props) => {
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	const { id } = useParams();
	const [colorChoose, setColorChoose] = useState("");
	const [input, setInput] = useState("");
	const handleChooseColor = (color: string): void => {
		setColorChoose(color);
	};
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	useEffect(() => {
		if (isEdit) {
			setInput(isEdit.tag.content);
			setColorChoose(isEdit.tag.color);
		}
	}, [isEdit]);
	const onAddLabel = (): void => {
		if (!input.trim() || !currentUser || !colorChoose.trim()) return;
		if (!isEdit) {
			const newTag: Tag = {
				id: Math.floor(Math.random() * 1000000).toString(),
				content: input.trim(),
				color: colorChoose,
			};
			const updatedTask: Task = {
				...task,
				tag: [...task.tag, newTag],
			};
			const updatedList: List = {
				...list,
				tasks: list.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
			};
			const updatedBoards = currentUser.boards.map((board) =>
				board.id === id
					? {
							...board,
							list: board.list.map((item) =>
								item.id === list.id ? updatedList : item
							),
					  }
					: board
			);
			const updatedUser: User = {
				...currentUser,
				boards: updatedBoards,
			};
			dispatch(addBoard(updatedUser));
			onClose(updatedList, updatedTask);
		} else {
			const tagUpdates: Tag = {
				...isEdit.tag,
				color: colorChoose,
				content: input.trim(),
			};
			const taskUpdates: Task = {
				...isEdit.task,
				tag: isEdit.task.tag.map((t) =>
					t.id === isEdit.tag.id ? tagUpdates : t
				),
			};
			const listUpdates: List = {
				...isEdit.list,
				tasks: isEdit.list.tasks.map((task) =>
					task.id === isEdit.task.id ? taskUpdates : task
				),
			};
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === id
						? {
								...board,
								list: board.list.map((item) =>
									item.id === isEdit.list.id ? listUpdates : item
								),
						  }
						: board
				),
			};
			dispatch(addBoard(updates));
			onClose(listUpdates, taskUpdates);
		}
		setInput("");
		setColorChoose("");
	};
	return (
		<div className="fixed inset-0 z-[10] flex justify-center items-center">
			<div
				onClick={() => onClose(list, task)}
				className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
			></div>
			<div className="w-[304px] bg-white p-3 rounded-lg z-[20]">
				<div className="flex justify-between items-center">
					<div className="cursor-pointer" onClick={() => onClose(list, task)}>
						<ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
					</div>
					<div className="text-[14px] font-semibold text-[#44546F]">
						{isEdit ? "Edit Lable" : "Create label"}
					</div>
					<div className="cursor-pointer" onClick={() => onClose(list, task)}>
						<CloseIcon fontSize="small"></CloseIcon>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-3">
					<div className="text-[12px] font-semibold text-[#44546F]">Title</div>
					<input
						value={input}
						onChange={handleInput}
						type="text"
						className="border h-[36px] rounded shadow px-3 hover: border-blue-500 outline-none focus:border-blue-500"
					/>
					<div className="text-[12px] font-semibold text-[#44546F]">
						Select a color
					</div>
					<div className="grid grid-cols-5 gap-2 pb-4 border-b border-b-gray-300">
						{colorRow.map((color, index) => (
							<div
								key={index}
								style={{ backgroundColor: color.color }}
								onClick={() => handleChooseColor(color.color)}
								className={`h-[32px] rounded cursor-pointer hover:border hover:border-blue-500 ${
									color.color === colorChoose ? "border border-blue-500" : ""
								}`}
							></div>
						))}
					</div>
				</div>
				<button
					onClick={onAddLabel}
					className="mt-3 px-3 py-2 bg-[#0C66E4] text-white rounded"
				>
					{isEdit ? "Save" : "Create"}
				</button>
			</div>
		</div>
	);
};
