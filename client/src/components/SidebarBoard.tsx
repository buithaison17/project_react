import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddIcon from "@mui/icons-material/Add";
import { SidebarBoardItem } from "./SidebarBoardItem";

export const SidebarBoard = () => {
	return (
		<div className="w-[240px] bg-[#F8F9FA]">
			<div className="flex flex-col gap-3 px-3 py-6 border-b border-b-gray-300">
				<div className="text-[12px] text-[#212529BF]">YOU WORKSPACES</div>
				<div className="flex gap-2 items-center cursor-pointer">
					<FormatListBulletedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Boards</div>
				</div>
				<div className="flex gap-2 items-center cursor-pointer">
					<StarBorderIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Starred Boards</div>
				</div>
				<div className="flex gap-2 items-center cursor-pointer">
					<ClearOutlinedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Closed Boards</div>
				</div>
			</div>
			<div className="flex flex-col gap-3 p-3">
				<div className="flex items-center justify-between">
					<div className="text-[14px] text-[#172B4D]">Your Boards</div>
					<AddIcon className="cursor-pointer" fontSize="small"></AddIcon>
				</div>
				<div className="flex flex-col gap-3">
					<SidebarBoardItem></SidebarBoardItem>
					<SidebarBoardItem></SidebarBoardItem>
				</div>
			</div>
		</div>
	);
};
