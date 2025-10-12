import CloseIcon from "@mui/icons-material/Close";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import type { List, Task, User } from "../utils/type";
import { getDateNow } from "../utils/getDateNow";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addBoard, fetchData } from "../store/usersReducer";
import { useParams } from "react-router-dom";

interface InputDate {
	startDate: Date | null;
	dueDate: Date | null;
}

interface Props {
	onClose: (list: List, task: Task) => void;
	list: List;
	task: Task;
}

export const ModalDateTask = ({ onClose, task, list }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const currentUser = users.find((user) => user.id === currentUserId);

	const [inputDate, setInputDate] = useState<InputDate>({
		startDate: null,
		dueDate: null,
	});

	const [enableStartDate, setEnableStartDate] = useState(false);
	const [enableDueDate, setEnableDueDate] = useState(false);
	const [fieldSelecting, setFieldSelecting] = useState<"start" | "due" | null>(
		null
	);

	useEffect(() => {
		if (task.due_date) {
			setInputDate({
				startDate: null,
				dueDate: new Date(task.due_date),
			});
			setEnableDueDate(true);
			setFieldSelecting("due");
		} else {
			setInputDate({ startDate: null, dueDate: null });
			setEnableDueDate(false);
			setFieldSelecting(null);
		}
	}, [task]);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	const handleEnableStartDate = () => {
		setEnableStartDate((prev) => !prev);
		setFieldSelecting("start");
		if (enableStartDate) setInputDate({ ...inputDate, startDate: null });
	};

	const handleEnableDueDate = () => {
		setEnableDueDate((prev) => !prev);
		setFieldSelecting("due");
		if (enableDueDate) setInputDate({ ...inputDate, dueDate: null });
	};

	const handleCalendarChange = (value: Date) => {
		if (fieldSelecting === "start")
			setInputDate({ ...inputDate, startDate: value });
		else if (fieldSelecting === "due")
			setInputDate({ ...inputDate, dueDate: value });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputDate({ ...inputDate, [name]: value ? new Date(value) : null });
	};

	const formatDate = (value: Date | null): string => {
		if (!value) return "";
		const year = value.getFullYear();
		const month = String(value.getMonth() + 1).padStart(2, "0");
		const day = String(value.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const onRemove = () => {
		setInputDate({ startDate: null, dueDate: null });
		setEnableStartDate(false);
		setEnableDueDate(false);
		setFieldSelecting(null);
	};

	const onSave = () => {
		if (!currentUser) return;
		const today = new Date(getDateNow());
		if (
			inputDate.startDate &&
			inputDate.dueDate &&
			inputDate.startDate > inputDate.dueDate
		) {
			console.log("Ngày bắt đầu không được lớn hơn ngày kết thúc");
			return;
		}
		if (inputDate.dueDate && inputDate.dueDate <= today) {
			console.log("Ngày kết thúc không được bé hơn ngày hiện tại");
			return;
		}
		const updatedTask: Task = {
			...task,
			due_date: formatDate(inputDate.dueDate),
		};

		const updatedList: List = {
			...list,
			tasks: list.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
		};
		const updatedUser: User = {
			...currentUser,
			boards: currentUser.boards.map((b) =>
				b.id === id
					? {
							...b,
							list: b.list.map((l) => (l.id === list.id ? updatedList : l)),
					  }
					: b
			),
		};
		dispatch(addBoard(updatedUser));
		onClose(updatedList, updatedTask);
	};
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div
				onClick={() => onClose(list, task)}
				className="fixed inset-0 bg-black/30"
			></div>
			<div className="w-fit bg-white z-20 p-3 rounded shadow">
				<div className="flex justify-between items-center">
					<div className="flex-1 text-center font-semibold text-[14px] text-[#44546F]">
						Dates
					</div>
					<div onClick={() => onClose(list, task)} className="cursor-pointer">
						<CloseIcon fontSize="small" />
					</div>
				</div>

				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateCalendar
						value={
							fieldSelecting === "start"
								? inputDate.startDate
								: inputDate.dueDate
						}
						onChange={(value) => handleCalendarChange(value as Date)}
					/>
				</LocalizationProvider>

				{/* Start Date */}
				<div className="mt-2">
					<label className="text-[14px] font-bold text-[#44546F]">
						Start Date
					</label>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={enableStartDate}
							onChange={handleEnableStartDate}
						/>
						<input
							type="date"
							name="startDate"
							value={formatDate(inputDate.startDate)}
							onChange={handleInputChange}
							onFocus={() => setFieldSelecting("start")}
							disabled={!enableStartDate}
							className={`px-2 py-1 rounded shadow ${
								enableStartDate
									? "border border-[#8590A2]"
									: "bg-[#091E4208] text-[#091E424F]"
							}`}
						/>
					</div>
				</div>

				{/* Due Date */}
				<div className="mt-3">
					<label className="text-[14px] font-bold text-[#44546F]">
						Due Date
					</label>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={enableDueDate}
							onChange={handleEnableDueDate}
						/>
						<input
							type="date"
							name="dueDate"
							value={formatDate(inputDate.dueDate)}
							onChange={handleInputChange}
							onFocus={() => setFieldSelecting("due")}
							disabled={!enableDueDate}
							className={`px-2 py-1 rounded shadow ${
								enableDueDate
									? "border border-[#8590A2]"
									: "bg-[#091E4208] text-[#091E424F]"
							}`}
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className="mt-3 flex flex-col gap-1">
					<button
						onClick={onSave}
						className="px-2 py-1 bg-blue-500 text-white rounded"
					>
						Save
					</button>
					<button
						onClick={onRemove}
						className="px-2 py-1 bg-[#091E420F] text-[#172B4D] rounded"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};
