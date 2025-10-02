import { Header } from "../components/Header";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { DashboardCartItem } from "../components/DashboardCartItem";
import { DashboardCartAdd } from "../components/DashboardCartAdd";

export const Dashboard = () => {
	return (
		<div className="h-screen w-screen bg-gray-100 flex flex-col">
			<Header />
			{/* Body chia 2 cột */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar trái */}
				<div className="w-[240px] border-r-2 border-gray-300 bg-gray-100 overflow-y-auto h-full">
					<div className="flex flex-col gap-3 border-b-2 px-4 py-10 border-b-gray-300">
						<div className="text-[12px]">YOUR WORKSPACES</div>
						<div className="flex gap-2 items-center cursor-pointer">
							<FormatListBulletedIcon
								className="text-blue-500"
								fontSize="small"
							/>
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
					<div className="flex flex-col gap-3 p-4">
						<div className="flex gap-2 items-center cursor-pointer">
							<SettingsIcon className="text-blue-500" fontSize="small" />
							<div className="text-blue-500 text-[14px]">Setting</div>
						</div>
						<div className="flex gap-2 items-center cursor-pointer">
							<ExitToAppIcon className="text-blue-500" fontSize="small" />
							<div className="text-blue-500 text-[14px]">Sign Out</div>
						</div>
					</div>
				</div>

				{/* Content chính */}
				<div className="flex-1 p-4 overflow-y-auto bg-white h-full">
					{/* Title */}
					<div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
						<div className="flex items-center gap-1">
							<FormatListBulletedIcon fontSize="large" />
							<div className="text-[32px] text-[#212529]">Your Workspaces</div>
						</div>
						<div className="flex gap-2 items-center">
							<div className="flex gap-2">
								<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
									Share
								</button>
								<button className="px-2 py-1 border border-gray-300 rounded-md text-[14px] text-[#6C757D]">
									Export
								</button>
							</div>
							<button>This Week</button>
						</div>
					</div>

					{/* Workspace boards */}
					<div className="p-2 grid grid-cols-4 gap-3 mt-3">
						<DashboardCartItem />
						<DashboardCartItem />
						<DashboardCartAdd></DashboardCartAdd>
					</div>

					{/* Starred boards */}
					<div className="mt-3">
						<div className="flex items-center gap-1 border-b-2 border-b-gray-200 py-2">
							<StarBorderIcon fontSize="large" />
							<div className="text-[28px] text-[#212529]">Starred Boards</div>
						</div>
						<div className="grid grid-cols-4 gap-3 mt-5">
							{Array.from({ length: 10 }).map((_, i) => (
								<DashboardCartItem key={i} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
