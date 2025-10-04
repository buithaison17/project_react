import { Header } from "../components/Header";
import { SidebarBoard } from "../components/SidebarBoard";
import Star from "../assets/images/star.png";
import BoardIcon from "../assets/images/board-icon.png";
import TableBoardIcon from "../assets/images/table-board.png";
import { BoardCard } from "../components/BoardCard";
import CloseTable from "../assets/images/close-table.png";
import { ModalTaskDetail } from "../components/ModalTaskDetail";
import { ModalLabel } from "../components/ModalLabel";
import { ModalCreateLabel } from "../components/ModalCreateLabel";
import { ModalMoveCard } from "../components/ModalMoveCard";

export const Board = () => {
	return (
		<div className="h-screen w-screen flex flex-col">
			{/* Header */}
			<Header />

			{/* Body */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<SidebarBoard />

				{/* Content */}
				<div className="flex-1 bg-white">
					<div className="bg-[#F1F2F4] p-3 flex">
						<div className="flex items-center gap-3">
							<div className="text-[18px] font-bold">
								Tổ chức sự kiện Year-end party !
							</div>
							<img src={Star} className="w-[32px] h-[32px]" alt="" />
							<div className="flex gap-2 items-center px-2 py-1 bg-[#00000080] rounded-md cursor-pointer">
								<img src={BoardIcon} className="w-[16px] h-[16px]" alt="" />
								<div className="text-white text-[14px]">Board</div>
							</div>
							<div className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer">
								<img
									src={TableBoardIcon}
									className="w-[16px] h-[16px]"
									alt=""
								/>
								<div className="text-[14px]">Table</div>
							</div>
							<div className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer">
								<img src={CloseTable} className="w-[16px] h-[16px]" alt="" />
								<div className="text-[14px]">Close this table</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4">
						<BoardCard></BoardCard>
						<BoardCard></BoardCard>
						<BoardCard></BoardCard>
						<BoardCard></BoardCard>
					</div>
				</div>
			</div>
			{/* <ModalTaskDetail></ModalTaskDetail> */}
			{/* <ModalLabel></ModalLabel> */}
			{/* <ModalCreateLabel></ModalCreateLabel> */}
			{/* <ModalMoveCard></ModalMoveCard> */}
		</div>
	);
};
