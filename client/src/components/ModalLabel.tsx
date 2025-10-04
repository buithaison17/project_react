import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const ModalLabel = () => {
	return (
		<div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-[9999] flex justify-center items-center">
			<div className="w-[304px] bg-white p-4 rounded-lg">
				<div className="flex justify-between items-center">
					<div className="flex-1 text-center text-[16px] font-semibold text-[#44546F]">
						Labels
					</div>
					<CloseIcon className="cursor-pointer"></CloseIcon>
				</div>
				<div>
					<div className="text-[14px] text-[#44546F] font-semibold">Labels</div>
					<div className="mt-3 flex flex-col gap-1">
						<div className="flex justify-between items-center">
							<input type="checkbox" className="w-[16px] h-[16px]" />
							<div className="w-[212px] px-3 py-2 bg-[#4BCE97] rounded text-[#164B35]">
								done
							</div>
							<ModeEditOutlineIcon fontSize="small"></ModeEditOutlineIcon>
						</div>
						<div className="flex justify-between items-center">
							<input type="checkbox" className="w-[16px] h-[16px]" />
							<div className="w-[212px] px-3 py-2 bg-[#FEA362] rounded text-[#164B35]">
								urgent
							</div>
							<ModeEditOutlineIcon fontSize="small"></ModeEditOutlineIcon>
						</div>
					</div>
				</div>
				<div className="w-full bg-[#091E420F] rounded text-[#172B4D] py-2 text-center mt-3 text-[14px] font-medium">
					Create a new label
				</div>
			</div>
		</div>
	);
};
