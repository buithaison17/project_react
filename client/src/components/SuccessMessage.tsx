import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SuccessMessage = () => {
	return (
		<div className="fixed top-3 left-3 p-4 bg-[#E5FFF0] rounded-md w-[300px]">
			<div className="flex gap-2 items-center">
				<CheckCircleIcon className="text-green-500"></CheckCircleIcon>
				<div>Đăng nhập thành công</div>
			</div>
		</div>
	);
};
