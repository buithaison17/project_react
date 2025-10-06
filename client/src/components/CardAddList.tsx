import AddIcon from "@mui/icons-material/Add";

export const CardAddList = () => {
	return (
		<div className="flex p-3 gap-2 items-center bg-[#F1F2F4] cursor-pointer rounded-xl h-[44px]">
			<AddIcon fontSize="small"></AddIcon>
			<div className="font-medium text-[14px] text-[#172B4D]">
				Add another list
			</div>
		</div>
	);
};
