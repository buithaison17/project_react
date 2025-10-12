// src/components/DashboardContent.tsx
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { DashboardCartItem } from "./DashboardCartItem";
import { DashboardCartAdd } from "./DashboardCartAdd";
import type { Board, User } from "../utils/type";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";

type DashboardContext = {
	currentUser: User | undefined;
	handleEdit: (board: Board) => void;
	handleOpenModalDelete: (id: string) => void;
	handleOpenModalAdd: () => void;
};

export const SecondDashboard = () => {
	const { currentUser, handleEdit, handleOpenModalDelete, handleOpenModalAdd } =
		useOutletContext<DashboardContext>();
	const navigate = useNavigate();
	const { typeBoard } = useParams();
	const getIcon = () => {
		switch (typeBoard) {
			case "board":
				return <FormatListBulletedIcon fontSize="large" />;
			case "starred-board":
				return <StarBorderIcon fontSize="large" />;
			case "close-board":
				return <CloseIcon fontSize="large" />;
			default:
				return "";
		}
	};
	const getTitle = (): string => {
		switch (typeBoard) {
			case "board":
				return "Your Boards";
			case "starred-board":
				return "Starred Boards";
			case "close-board":
				return "Close Boards";
			default:
				return "";
		}
	};
	const handleNavigateBoardDetail = (board: Board): void => {
		switch (board.type) {
			case "normal":
				navigate(`/board/${board.id}`);
				return;
			case "starred":
				navigate(`/starred-board/${board.id}`);
				return;
			case "close":
				navigate(`/close-board/${board.id}`);
				return;
		}
	};
	return (
		<div className="flex-1 p-4 overflow-y-auto bg-white h-full">
			{/* Header */}
			<div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
				<div className="flex items-center gap-1">
					{getIcon()}
					<div className="text-[32px] text-[#212529]">{getTitle()}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="flex gap-2">
						<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
							Share
						</button>
						<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
							Export
						</button>
					</div>
					<button>This Week</button>
				</div>
			</div>

			{typeBoard == "board" && (
				<div className="p-2 grid grid-cols-4 gap-3 mt-3 max-sm:grid-cols-2">
					{currentUser?.boards.map((board) => (
						<DashboardCartItem
							key={board.id}
							board={board}
							handleEdit={() => handleEdit(board)}
							handleDelete={() => handleOpenModalDelete(board.id)}
							onClick={() => handleNavigateBoardDetail(board)}
						/>
					))}
					<DashboardCartAdd handleAdd={handleOpenModalAdd} />
				</div>
			)}
			{typeBoard === "starred-board" && (
				<div className="p-2 grid grid-cols-4 gap-3 mt-3 max-sm:grid-cols-2">
					{currentUser?.boards
						.filter((board) => board.type === "starred")
						.map((board) => (
							<DashboardCartItem
								key={board.id}
								board={board}
								handleEdit={() => handleEdit(board)}
								handleDelete={() => handleOpenModalDelete(board.id)}
								onClick={() => handleNavigateBoardDetail(board)}
							/>
						))}
				</div>
			)}
			{typeBoard === "close-board" && (
				<div className="p-2 grid grid-cols-4 gap-3 mt-3 max-sm:grid-cols-2">
					{currentUser?.boards
						.filter((board) => board.type === "close")
						.map((board) => (
							<DashboardCartItem
								key={board.id}
								board={board}
								handleEdit={() => handleEdit(board)}
								handleDelete={() => handleOpenModalDelete(board.id)}
								onClick={() => handleNavigateBoardDetail(board)}
							/>
						))}
				</div>
			)}
		</div>
	);
};
