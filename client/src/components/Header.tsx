import logodashboard from "../assets/images/logo-dashboard.png";

export const Header = () => {
	return (
		<div className="relative shadow-lg z-10">
			<div className="flex items-center w-[240px] border-r-2 border-r-gray-300p p-3">
				<img
					src={logodashboard}
					alt="Dashboard Logo"
					className="w-20 h-4 object-contain"
				/>
			</div>
		</div>
	);
};
