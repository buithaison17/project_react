import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TaskModalDesIcon from "../assets/images/task-modal-des-icon.png";
import LabelIcon from "../assets/images/label-icon.png";
import DateIcon from "../assets/images/date-icon.png";
import DeleteIcon from "../assets/images/delete-icon.png";
import MDEditor from "@uiw/react-md-editor";
import type { List, Task, User } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { addBoard, fetchData } from "../store/usersReducer";
import { useParams } from "react-router-dom";

interface PropsType {
	list: List;
	task: Task;
	onClose: () => void;
	handleDelete: (list: List, task: Task) => void;
	handleLabel: (list: List, task: Task) => void;
}

export const ModalTaskDetail = ({
	list,
	task,
	onClose,
	handleDelete,
	handleLabel,
}: PropsType) => {
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	const [inputDescription, setInputDescription] = useState("");
	useEffect(() => {
		if (task.description) {
			setInputDescription(task.description);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const onAddDescription = (): void => {
		if (!currentUser) return;
		const taskUpdates: Task = {
			...task,
			description: inputDescription.trim(),
		};
		const listUpdates: List = {
			...list,
			tasks: list.tasks.map((t) => (t.id === task.id ? taskUpdates : t)),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === id
					? {
							...board,
							list: board.list.map((item) =>
								item.id === list.id ? listUpdates : item
							),
					  }
					: board
			),
		};
		dispatch(addBoard(updates));
		setInputDescription("");
		onClose();
	};
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div
				onClick={onClose}
				className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
			></div>
			<div className="w-[768px] bg-white rounded-md shadow p-3 z-20">
				<div className="flex items-center gap-2">
					<CircleOutlinedIcon fontSize="small"></CircleOutlinedIcon>
					<div className="text-[20px] text-[#172B4D] font-semibold">
						Kịch bản
					</div>
				</div>
				<div className="px-7 flex items-center gap-1">
					<div className="text-[14px] text-[#44546F]">in list</div>
					<select className="h-[16px] text-[11px] text-[#44546F] font-bold bg-[#DCDFE4]">
						<option value="IN-PROGRESS">{list.title}</option>
					</select>
				</div>
				<div className="flex justify-between mt-4">
					<div className="flex flex-col">
						<div className="flex items-center gap-1">
							<img
								src={TaskModalDesIcon}
								className="w-[24px] h-[24px]"
								alt=""
							/>
							<div className="text-[16px] text-[#172B4D] font-semibold">
								Description
							</div>
						</div>
						<div className="px-7 py-3">
							<MDEditor
								className="w-[512px] h-[275px]"
								value={inputDescription}
								onChange={(val) => setInputDescription(val || "")}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div
							onClick={() => handleLabel(list, task)}
							className="flex gap-1 items-center bg-[#091E420F] py-2 pl-3 w-[168px] rounded"
						>
							<img src={LabelIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Labels
							</div>
						</div>
						<div className="flex gap-1 items-center bg-[#091E420F] py-2 pl-3 w-[168px] rounded">
							<img src={DateIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Dates
							</div>
						</div>
						<div
							onClick={() => handleDelete(list, task)}
							className="flex gap-1 items-center bg-[#C9372C] py-2 pl-3 w-[168px] rounded"
						>
							<img src={DeleteIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-white font-medium">Delete</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 px-7 mt-1">
					<button
						onClick={onAddDescription}
						className="w-[56px] h-[32px] text-center text-white bg-[#0C66E4] rounded-sm"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="w-[56px] h-[32px] text-center text-[#172B4D] rounded-sm"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
