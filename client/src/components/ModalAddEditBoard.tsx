import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useMemo, useState } from "react";
import type { Board, User } from "../utils/type";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { getDateNow } from "../utils/getDateNow";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addBoard, fetchData } from "../store/usersReducer";

interface ImageItem {
	image: string;
}

interface ColorItem {
	from: string;
	to: string;
}

const imageRow: ImageItem[] = [
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378225/m2zskmrawqpvxnvsuetr.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378161/jtoihhg4izrph1rcrlxq.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378938/tv6klliekufan47mzmdy.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378951/zgjhcdp7zqdubp5rrcfo.jpg",
	},
];

const colorRow: ColorItem[] = [
	{
		from: "#FFB100",
		to: "#FA0C00",
	},
	{
		from: "#2609FF",
		to: "#D20CFF",
	},
	{
		from: "#00FF2F",
		to: "#00FFC8",
	},
	{
		from: "#00FFE5",
		to: "#004BFA",
	},
	{
		from: "#FFA200",
		to: "#EDFA00",
	},
	{
		from: "#FF00EA",
		to: "#FA0C00",
	},
];

interface PropsType {
	handleClose: () => void;
	isEdit?: Board | null;
	isStarred: boolean;
}

export const ModalAddEditBoard = ({
	handleClose,
	isEdit,
	isStarred,
}: PropsType) => {
	const { currentUserId, users } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const currentUser = useMemo(() => {
		return users.find((user) => user.id === currentUserId);
	}, [users, currentUserId]);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const [inputState, setInputState] = useState({
		title: "",
		color: {
			from: "",
			to: "",
		},
		image: "",
	});
	useEffect(() => {
		if (isEdit) {
			setInputState({
				...inputState,
				title: isEdit?.title as string,
				image: isEdit?.backdrop as string,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);
	const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputState({ ...inputState, title: e.target.value });
	};
	const handleImage = (value: string): void => {
		setInputState({ ...inputState, image: value });
	};
	const handleColor = (from: string, to: string): void => {
		setInputState({
			...inputState,
			color: {
				from: from,
				to: to,
			},
		});
	};
	const onSubmit = (): void => {
		const { title, image } = inputState;
		if (!title.trim()) {
			toast.error("Tiêu đề board không được để trống");
			return;
		}
		if (!isEdit) {
			const board: Board = {
				id: Math.floor(Math.random() * 1000000).toString(),
				title: title.trim(),
				description: "",
				created_at: getDateNow(),
				backdrop: image ? image : imageRow[0].image,
				is_starred: isStarred,
				list: [],
			};
			const newCurrentUser: User = {
				...currentUser!,
				boards: [...currentUser!.boards, board],
			};
			dispatch(addBoard(newCurrentUser!));
		} else {
			const boardUpdates: Board = {
				...isEdit,
				title: inputState.title.trim(),
				backdrop: inputState.image,
			};
			if (currentUser) {
				const currentUserUpdates: User = {
					...currentUser,
					boards: currentUser?.boards.map((board) =>
						board.id === isEdit.id ? boardUpdates : board
					),
				};
				dispatch(addBoard(currentUserUpdates));
			}
		}
		handleClose();
	};
	return (
		<>
			<ToastContainer
				className="z-[99999]"
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
			<div className="fixed inset-0 flex justify-center items-center z-[9999]">
				{/* Overlay */}
				<div
					onClick={handleClose}
					className="fixed inset-0 h-screen w-screen bg-[rgba(0,0,0,0.3)]"
				/>

				{/* Content */}
				<div className="relative z-[10000] py-3 bg-white rounded-md shadow-xl w-[500px]">
					<div className="flex justify-between items-center p-3 border-b border-b-gray-300">
						<div className="text-[20px] font-bold">
							{isEdit ? "Edit Board" : "Create Board"}
						</div>
						<div onClick={handleClose} className="cursor-pointer">
							<ClearIcon></ClearIcon>
						</div>
					</div>
					<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
						<div className="text-[20px] font-bold text-[#212529]">
							Background
						</div>
						<div className="grid grid-cols-4 gap-1">
							{imageRow.map((item, index) => (
								<div
									onClick={() => handleImage(item.image)}
									key={index}
									className="relative"
								>
									<img
										src={item.image}
										className="w-[108px] rounded-md h-[60px]"
									/>
									{item.image === inputState.image && (
										<CheckCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
									)}
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
						<div className="text-[20px] text-[#212529] font-bold">Color</div>
						<div className="grid grid-cols-6 gap-1">
							{colorRow.map((item, index) => (
								<div
									onClick={() => handleColor(item.from, item.to)}
									key={index}
									style={{
										backgroundImage: `linear-gradient(to bottom, ${item.from}, ${item.to})`,
									}}
									className={`h-[40px] rounded-md flex justify-center items-center`}
								>
									{item.from === inputState.color.from &&
										item.to === inputState.color.to && (
											<CheckCircleIcon className="text-white" />
										)}
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
						<div className="text-[18px] font-bold text-[v]">Board title</div>
						<input
							type="text"
							onChange={handleTitle}
							value={inputState.title}
							className="py-[12px] px-3 text-[16px] text-[#212529] border rounded-md hover:border-blue-500 focus:border-blue-500 focus:outline-none"
						/>
						<div className="text-[16px] font-normal text-[#212529]">
							👋 Please provide a valid board title.
						</div>
					</div>
					<div className="flex gap-3 justify-end items-center py-4 px-3">
						<button
							onClick={handleClose}
							className="px-2 py-1 border text-[16px] border-[#DC3545] rounded-md text-[#DC3545]"
						>
							Close
						</button>
						<button
							onClick={onSubmit}
							className="px-2 py-1 border text-[16px] border-[#0D6EFD] rounded-md text-[#0D6EFD]"
						>
							{isEdit ? "Save" : "Create"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
