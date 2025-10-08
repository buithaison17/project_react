import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddIcon from "@mui/icons-material/Add";
import { SidebarBoardItem } from "./SidebarBoardItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchData } from "../store/usersReducer";
import { useNavigate } from "react-router-dom";
import type { Board, Type } from "../utils/type";

interface PropsType {
	type: Type;
}

export const SidebarBoard = ({ type }: PropsType) => {
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((u) => u.id === currentUserId);
	const handleNagative = (board: Board): void => {
		switch (board.type) {
			case "normal":
				navigate(`/board/${board.id}`);
				return;
			case "starred":
				navigate(`/starred-board/${board.id}`);
				return;
			case "close":
				console.log("123");
				navigate(`/close-board/${board.id}`);
				return;
		}
	};
	return (
		<div className="w-[240px] bg-[#F8F9FA]">
			<div className="flex flex-col gap-3 px-3 py-6 border-b border-b-gray-300">
				<div className="text-[12px] text-[#212529BF]">YOU WORKSPACES</div>
				<div
					onClick={() => navigate("/board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<FormatListBulletedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Boards</div>
				</div>
				<div
					onClick={() => navigate("/starred-board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<StarBorderIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Starred Boards</div>
				</div>
				<div
					onClick={() => navigate("/close-board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<ClearOutlinedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Closed Boards</div>
				</div>
			</div>
			<div className="flex flex-col gap-3 p-3">
				<div className="flex items-center justify-between">
					<div className="text-[14px] text-[#172B4D]">Your Boards</div>
					<AddIcon className="cursor-pointer" fontSize="small"></AddIcon>
				</div>
				<div className="flex flex-col">
					{currentUser?.boards
						.filter((board) => board.type === type)
						.map((board) => (
							<SidebarBoardItem
								key={board.id}
								board={board}
								onClick={() => handleNagative(board)}
							></SidebarBoardItem>
						))}
				</div>
			</div>
		</div>
	);
};
