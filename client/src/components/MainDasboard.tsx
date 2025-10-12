// src/components/DashboardContent.tsx
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { DashboardCartItem } from "./DashboardCartItem";
import { DashboardCartAdd } from "./DashboardCartAdd";
import type { Board, User } from "../utils/type";
import { useNavigate, useOutletContext } from "react-router-dom";

type DashboardContext = {
	currentUser: User | undefined;
	handleEdit: (board: Board) => void;
	handleOpenModalDelete: (id: string) => void;
	handleOpenModalAdd: () => void;
};

export const MainDasboard = () => {
	const { currentUser, handleEdit, handleOpenModalDelete, handleOpenModalAdd } =
		useOutletContext<DashboardContext>();
	const navigate = useNavigate();
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
					<FormatListBulletedIcon fontSize="large" />
					<div className="text-[32px] text-[#212529]">Your Workspaces</div>
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

			{/* Normal Boards */}
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

			{/* Starred Boards */}
			<div className="mt-3">
				<div className="flex items-center gap-1 border-b-2 border-b-gray-200 py-2">
					<StarBorderIcon fontSize="large" />
					<div className="text-[28px] text-[#212529]">Starred Boards</div>
				</div>
				<div className="grid grid-cols-4 gap-3 mt-5 max-sm:grid-cols-2">
					{currentUser?.boards
						.filter((board) => board.type === "starred")
						.map((board) => (
							<DashboardCartItem
								key={board.id}
								board={board}
								handleEdit={() => handleEdit(board)}
								handleDelete={() => handleOpenModalDelete(board.id)}
								onClick={() => navigate(`/starred-board/${board.id}`)}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
