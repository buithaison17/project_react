import EditItemDashboard from "../assets/images/edit-dashboard.png";

export const DashboardCartItem = () => {
	return (
		<div
			style={{
				backgroundImage:
					"url(https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378161/jtoihhg4izrph1rcrlxq.jpg)",
			}}
			className="h-[130px] bg-cover bg-center rounded-md relative"
		>
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="absolute top-3 left-3 text-[18px] text-white">
				Board Title
			</div>
			<div className="absolute bottom-3 left-3 p-2 bg-[#2C3E5D] rounded-md flex gap-1 items-center cursor-pointer">
				<img
					className="w-[16px] h-[16px] object-cover object-center"
					src={EditItemDashboard}
				></img>
				<div className="text-[14px] text-white">Edit this board</div>
			</div>
		</div>
	);
};
