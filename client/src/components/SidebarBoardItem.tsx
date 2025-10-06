import type { Board } from "../utils/type";

interface PropsType {
	board: Board;
	onClick: () => void;
}

export const SidebarBoardItem = ({ board, onClick }: PropsType) => {
	return (
		<div onClick={onClick} className="flex items-center gap-2 cursor-pointer">
			<img
				src={board.backdrop}
				className="w-[24px] h-[20px] object-cover object-center"
			></img>
			<div className="text-[14px] text-[#172B4D] hover:underline">
				{board.title}
			</div>
		</div>
	);
};
