import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

interface PropsType {
	handleLogout: () => void;
}

export const Sidebar = ({ handleLogout }: PropsType) => {
	const navigate = useNavigate();
	return (
		<div className="w-[240px] border-r-2 border-gray-300 bg-gray-100 overflow-y-auto h-full max-sm:hidden">
			<div className="flex flex-col gap-3 border-b-2 px-4 py-6 border-b-gray-300">
				<div className="text-[12px]">YOUR WORKSPACES</div>
				<div
					onClick={() => navigate("/board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<FormatListBulletedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Boards</div>
				</div>
				<div
					onClick={() => navigate("/starred-board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<StarBorderIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Starred Boards</div>
				</div>
				<div
					onClick={() => navigate("/close-board")}
					className="flex gap-2 items-center cursor-pointer"
				>
					<ClearOutlinedIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Closed Boards</div>
				</div>
			</div>
			<div className="flex flex-col gap-3 p-4">
				<div className="flex gap-2 items-center cursor-pointer">
					<SettingsIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Setting</div>
				</div>
				<div
					onClick={handleLogout}
					className="flex gap-2 items-center cursor-pointer"
				>
					<ExitToAppIcon className="text-blue-500" fontSize="small" />
					<div className="text-blue-500 text-[14px]">Sign Out</div>
				</div>
			</div>
		</div>
	);
};
