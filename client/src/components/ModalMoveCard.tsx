import CloseIcon from "@mui/icons-material/Close";

export const ModalMoveCard = () => {
	return (
		<div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-[9999] flex justify-center items-center">
			<div className="w-[304px] bg-white rounded-lg p-4">
				<div className="flex justify-between items-center">
					<div className="flex-1 text-center font-semibold text-[14px] text-[#44546F]">
						Move card
					</div>
					<CloseIcon fontSize="small" className="cursor-pointer"></CloseIcon>
				</div>
				<div className="flex flex-col gap-3 mt-4">
					<div className="text-[12px] font-semibold text-[#44546F]">
						Select destination
					</div>
					<div className="flex flex-col gap-1">
						<div className="text-[14px] text-[#172B4D] font-bold">Board</div>
						<input
							type="text"
							className="h-[40px] border border-[#8590A2] rounded pl-3 hover:border-blue-500 text-[14px] text-[#172B4D]"
						/>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col gap-1">
							<div className="text-[14px] text-[#172B4D] font-bold">Board</div>
							<select
								name=""
								className="h-[40px] w-[185px] px-2 text-[14px] text-[#172B4D] border border-[#8590A2] rounded-md"
							>
								<option value="In-progress">In-progress</option>
							</select>
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-[14px] text-[#172B4D] font-bold">
								Position
							</div>
							<select
								name=""
								className="h-[40px] w-[78px] px-2 text-[14px] text-[#172B4D] border border-[#8590A2] rounded-md"
							>
								<option value="In-progress">1</option>
							</select>
						</div>
					</div>
				</div>
				<button className="px-6 py-2 bg-[#0C66E4] rounded-md mt-4 text-white">Move</button>
			</div>
		</div>
	);
};
