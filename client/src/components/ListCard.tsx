import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import Frame from "../assets/images/frame.png";
import type { List } from "../utils/type";

interface PropsType {
	list: List;
}

export const ListCard = ({ list }: PropsType) => {
	return (
		<div className="bg-[#F1F2F4] rounded-md  p-3">
			<div className="flex items-center justify-between">
				<div className="text-[14px] text-[#172B4D] font-bold">{list.title}</div>
				<MoreHorizIcon fontSize="small"></MoreHorizIcon>
			</div>
			<div className="mt-3 flex flex-col gap-1">
				{list.tasks.map((task) => (
					<div
						key={task.id}
						className="flex gap-1 items-center bg-white p-1 shadow rounded-md"
					>
						<CheckCircleIcon
							className="text-green-500"
							fontSize="small"
						></CheckCircleIcon>
						<div>{task.title}</div>
					</div>
				))}
			</div>
			<div className="mt-4 flex justify-between items-center">
				<div className="flex gap-1 items-center">
					<AddIcon fontSize="small"></AddIcon>
					<div className="text-[14px] text-[#44546F] hover:underline cursor-pointer">
						Add a cart
					</div>
				</div>
				<img
					src={Frame}
					className="w-[16px] h-[16px] object-cover object-center"
					alt=""
				/>
			</div>
		</div>
	);
};
