import FilterListIcon from "@mui/icons-material/FilterList";
import { FilterDropdown } from "../components/FilterDropdown";
import Star from "../assets/images/star.png";
import BoardIcon from "../assets/images/board-icon.png";
import TableBoardIcon from "../assets/images/table-board.png";
import { ListCard } from "../components/ListCard";
import CloseTable from "../assets/images/close-table.png";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { ModalDelete } from "./ModalDelete";
import { CardAddList } from "./CardAddList";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchData } from "../store/usersReducer";
import { useParams } from "react-router-dom";

export const MainBoard = () => {
	const { currentUserId, users } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const { id } = useParams();
	const currentUser = users.find((user) => user.id === currentUserId);
	const currentBoard = currentUser?.boards.find((board) => board.id === id);
	const [openFilter, setOpenFilter] = useState(false);
	const handleToggleFilter = (): void => {
		setOpenFilter(!openFilter);
	};
	const [closeBoard, setCloseBoard] = useState(false);
	const handleCloseBoard = (): void => {
		setCloseBoard(!closeBoard);
	};
	const onCloseBoard = (): void => {
		toast.success("Đóng board thành công");
		handleCloseBoard();
	};
	return (
		<div className="flex-1 bg-white">
			<ToastContainer
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
			<div className="bg-[#F1F2F4] px-4 py-3 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<div className="text-[18px] font-bold">{currentBoard?.title}</div>
					<img src={Star} className="w-[32px] h-[32px]" alt="" />
					<div className="flex gap-2 items-center px-2 py-1 bg-[#00000080] rounded-md cursor-pointer">
						<img src={BoardIcon} className="w-[16px] h-[16px]" alt="" />
						<div className="text-white text-[14px]">Board</div>
					</div>
					<div className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer">
						<img src={TableBoardIcon} className="w-[16px] h-[16px]" alt="" />
						<div className="text-[14px]">Table</div>
					</div>
					<div
						onClick={handleCloseBoard}
						className="flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer"
					>
						<img src={CloseTable} className="w-[16px] h-[16px]" alt="" />
						<div className="text-[14px]">Close this table</div>
					</div>
				</div>
				<div className="relative">
					<div
						onClick={handleToggleFilter}
						className="flex gap-2 cursor-pointer"
					>
						<FilterListIcon fontSize="small"></FilterListIcon>
						<div className="text-[14px] text-[#172B4D] font-medium">
							Filters
						</div>
					</div>
					{openFilter && (
						<FilterDropdown toggleFilter={handleToggleFilter}></FilterDropdown>
					)}
				</div>
			</div>
			<div className="grid grid-cols-4 p-3 gap-3 items-start">
				{currentBoard?.list.map((list) => (
					<ListCard key={list.id} list={list}></ListCard>
				))}
				<CardAddList></CardAddList>
			</div>
			{closeBoard && (
				<ModalDelete
					handleClose={handleCloseBoard}
					onDelete={onCloseBoard}
				></ModalDelete>
			)}
		</div>
	);
};
