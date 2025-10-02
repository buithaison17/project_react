import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";

export const ErrorMessage = () => {
	return (
		<div className="fixed top-3 left-3 p-4 bg-[#ffe5e8] rounded-md w-[300px]">
			<div className="flex justify-between items-center">
				<div className="flex gap-1 items-center">
					<RemoveCircleIcon className="text-red-600"></RemoveCircleIcon>
					<div>Error</div>
				</div>
				<CloseIcon className="cursor-pointer"></CloseIcon>
			</div>
			<div className="text-[13px] mt-1">
				<div>Email không được bỏ trống</div>
				<div>Mật khẩu không được bỏ trống</div>
			</div>
		</div>
	);
};
