import EditItemDashboard from "../assets/images/edit-dashboard.png";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Board } from "../utils/type";
import type React from "react";

interface PropsType {
	board: Board;
	handleEdit: () => void;
	handleDelete: () => void;
	onClick: () => void;
}

export const DashboardCartItem = ({
	board,
	handleEdit,
	handleDelete,
	onClick,
}: PropsType) => {
	return (
		<div
			onClick={() => onClick()}
			style={{
				backgroundImage: `url(${board.backdrop})`,
			}}
			className="h-[130px] bg-cover bg-center rounded-md relative group"
		>
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="absolute top-3 left-3 text-[18px] text-white">
				{board.title}
			</div>
			<div className="absolute bottom-3 left-3 p-2 bg-[#2C3E5D] rounded-md flex gap-1 items-center cursor-pointer opacity-0 group-hover:opacity-100 duration-500">
				<img
					className="w-[16px] h-[16px] object-cover object-center"
					src={EditItemDashboard}
				></img>
				<div
					onClick={(e: React.MouseEvent<HTMLDivElement>) => {
						e.stopPropagation();
						handleEdit();
					}}
					className="text-[14px] text-white"
				>
					Edit this board
				</div>
			</div>
			<div
				onClick={(e: React.MouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
					handleDelete();
				}}
				className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 duration-500 cursor-pointer"
			>
				<DeleteIcon className="text-red-500" fontSize="large"></DeleteIcon>
			</div>
		</div>
	);
};
