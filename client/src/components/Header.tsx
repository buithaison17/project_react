import logodashboard from "../assets/images/logo-dashboard.png";
import SearchIcon from "../assets/images/search-icon.png";
import NavbarIcon from "../assets/images/navbar-icon.png";

interface Props {
	openSidebarMobile?: () => void;
}

export const Header = ({ openSidebarMobile }: Props) => {
	return (
		<div className="relative shadow-lg z-10 flex justify-between">
			<div className="flex items-center w-[240px] border-r-2 border-r-gray-300p p-3">
				<img
					src={logodashboard}
					alt="Dashboard Logo"
					className="w-20 h-4 object-contain"
				/>
			</div>
			<div className="p-3 flex items-center gap-[16px]">
				<img
					src={SearchIcon}
					className="hidden w-[16px] h-[16px] cursor-pointer max-sm:block"
					alt="Search Icon"
				/>
				<img
					src={NavbarIcon}
					onClick={openSidebarMobile}
					className="hidden w-[16px] h-[16px] cursor-pointer max-sm:block"
					alt="Navbar Icon"
				/>
			</div>
		</div>
	);
};
