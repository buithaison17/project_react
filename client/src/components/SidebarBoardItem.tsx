import type { Board } from "../utils/type";
import { useParams } from "react-router-dom";

interface PropsType {
	board: Board;
	onClick: () => void;
}

export const SidebarBoardItem = ({ board, onClick }: PropsType) => {
	const { id } = useParams();
	return (
		<div
			onClick={onClick}
			className={`flex items-center gap-2 cursor-pointer px-2 py-1 ${
				board.id === id ? "bg-gray-300" : ""
			}`}
		>
			<img
				src={board.backdrop}
				className="w-[24px] h-[20px] object-cover object-center"
			></img>
			<div className="text-[14px] text-[#172B4D] hover:underline truncate w-[100px]">
				{board.title}
			</div>
		</div>
	);
};
