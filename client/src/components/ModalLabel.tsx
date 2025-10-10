import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import type { List, Tag, Task } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchData } from "../store/usersReducer";
import { useParams } from "react-router-dom";

interface Props {
	list: List;
	task: Task;
	onClose: () => void;
	handleAdd: (list: List, task: Task) => void;
	handleEdit: (list: List, task: Task, tag: Tag) => void;
}

export const ModalLabel = ({
	list,
	task,
	onClose,
	handleAdd,
	handleEdit,
}: Props) => {
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const { id } = useParams();
	const currentUser = users.find((user) => user.id === currentUserId);
	const board = currentUser?.boards.find((board) => board.id === id);
	const listCurrent = board?.list.find((item) => item.id === list.id);
	const taskCurrent = listCurrent?.tasks.find((t) => t.id === task.id);
	return (
		<div className="fixed inset-0 z-[10] flex justify-center items-center">
			<div
				onClick={onClose}
				className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
			></div>
			<div className="w-[304px] bg-white p-4 rounded-lg z-[20]">
				<div className="flex justify-between items-center">
					<div className="flex-1 text-center text-[16px] font-semibold text-[#44546F]">
						Labels
					</div>
					<div onClick={onClose}>
						<CloseIcon className="cursor-pointer"></CloseIcon>
					</div>
				</div>
				<div>
					<div className="text-[14px] text-[#44546F] font-semibold">Labels</div>
					<div className="mt-3 flex flex-col gap-1">
						{taskCurrent!.tag.map((tag: Tag) => (
							<div key={tag.id} className="flex justify-between items-center">
								<input type="checkbox" className="w-[16px] h-[16px]" />
								<div
									style={{ backgroundColor: `${tag.color}` }}
									className="w-[212px] px-3 py-2 rounded text-[#164B35]"
								>
									{tag.content}
								</div>
								<div
									onClick={() => handleEdit(listCurrent!, taskCurrent!, tag)}
									className="cursor-pointer"
								>
									<ModeEditOutlineIcon fontSize="small"></ModeEditOutlineIcon>
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					onClick={() => handleAdd(listCurrent!, taskCurrent!)}
					className="w-full bg-[#091E420F] rounded text-[#172B4D] py-2 text-center mt-3 text-[14px] font-medium cursor-pointer"
				>
					Create a new label
				</div>
			</div>
		</div>
	);
};
