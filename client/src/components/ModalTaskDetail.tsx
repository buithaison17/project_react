import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TaskModalDesIcon from "../assets/images/task-modal-des-icon.png";
import LabelIcon from "../assets/images/label-icon.png";
import DateIcon from "../assets/images/date-icon.png";
import DeleteIcon from "../assets/images/delete-icon.png";
import MDEditor from "@uiw/react-md-editor";

export const ModalTaskDetail = () => {
	return (
		<div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-[9999]">
			<div className="w-[768px] bg-white rounded-md shadow p-3">
				<div className="flex items-center gap-2">
					<CircleOutlinedIcon fontSize="small"></CircleOutlinedIcon>
					<div className="text-[20px] text-[#172B4D] font-semibold">
						Kịch bản
					</div>
				</div>
				<div className="px-7 flex items-center gap-1">
					<div className="text-[14px] text-[#44546F]">in list</div>
					<select
						name=""
						className="h-[16px] text-[11px] text-[#44546F] font-bold bg-[#DCDFE4]"
					>
						<option value="IN-PROGRESS">IN-PROGRESS</option>
					</select>
				</div>
				<div className="flex justify-between mt-4">
					<div className="flex flex-col">
						<div className="flex items-center gap-1">
							<img
								src={TaskModalDesIcon}
								className="w-[24px] h-[24px]"
								alt=""
							/>
							<div className="text-[16px] text-[#172B4D] font-semibold">
								Description
							</div>
						</div>
						<div className="px-7 py-3">
							<MDEditor className="w-[512px] h-[275px]" />
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 items-center bg-[#091E420F] py-2 pl-3 w-[168px] rounded">
							<img src={LabelIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Labels
							</div>
						</div>
						<div className="flex gap-1 items-center bg-[#091E420F] py-2 pl-3 w-[168px] rounded">
							<img src={DateIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Dates
							</div>
						</div>
						<div className="flex gap-1 items-center bg-[#C9372C] py-2 pl-3 w-[168px] rounded">
							<img src={DeleteIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-white font-medium">Delete</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 px-7 mt-1">
					<button className="w-[56px] h-[32px] text-center text-white bg-[#0C66E4] rounded-sm">
						Save
					</button>
					<button className="w-[56px] h-[32px] text-center text-[#172B4D] rounded-sm">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
