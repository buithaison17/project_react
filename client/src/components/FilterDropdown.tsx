import CloseIcon from "@mui/icons-material/Close";
import OverdueIcon from "../assets/images/overdue-icon.png";
import NoDatesIcon from "../assets/images/no-dates-icon.png";
import DueNextDayIcon from "../assets/images/due-nextday-icon.png";
import NoLabelsIcon from "../assets/images/no-labels-icon.png";

interface PropsType {
	toggleFilter: () => void;
}

export const FilterDropdown = ({ toggleFilter }: PropsType) => {
	return (
		<div className="absolute flex flex-col bg-white overflow-hidden w-[384px] rounded-lg shadow top-6 right-0 p-3">
			<div className="flex justify-between items-center">
				<div className="flex-1 text-center text-[14px] text-[#44546F] font-semibold">
					Filter
				</div>
				<div onClick={toggleFilter} className="cursor-pointer">
					<CloseIcon fontSize="small"></CloseIcon>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-2">
				<div className="text-[12px] text-[#44546F] font-semibold">Keyword</div>
				<input
					type="text"
					className="h-[36px] border rounded px-3 py-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
					placeholder="Enter a keyword…"
				/>
				<div className="text-[11px] text-[#44546F]">Search cards,</div>
			</div>
			<div className="flex flex-col gap-2 mt-3">
				<div className="text-[12px] text-[#44546F] font-semibold">
					Card status
				</div>
				<div className="flex gap-6 items-center px-3">
					<input
						type="checkbox"
						id="marked-as-complete"
						className="w-[16px] h-[16px]"
					/>
					<label
						htmlFor="marked-as-complete"
						className="text-[14px] text-[#172B4D]"
					>
						Marked as complete
					</label>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input
						type="checkbox"
						id="not-marked-as-complete"
						className="w-[16px] h-[16px]"
					/>
					<label
						htmlFor="not-marked-as-complete"
						className="text-[14px] text-[#172B4D]"
					>
						Not marked as complete
					</label>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-3">
				<div className="text-[12px] text-[#44546F] font-semibold">Due date</div>
				<div className="flex gap-6 items-center px-3">
					<input type="checkbox" id="no-dates" className="w-[16px] h-[16px]" />
					<div className="flex items-center gap-1">
						<img src={NoDatesIcon} className="w-[24px] h-[24px]" alt="" />
						<label htmlFor="no-dates" className="text-[14px] text-[#172B4D]">
							No dates
						</label>
					</div>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input type="checkbox" id="overdue" className="w-[16px] h-[16px]" />
					<div className="flex items-center gap-1">
						<img src={OverdueIcon} className="w-[24px] h-[24px]" alt="" />
						<label htmlFor="overdue" className="text-[14px] text-[#172B4D]">
							Overdue
						</label>
					</div>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input
						type="checkbox"
						id="due-in-the-next-day"
						className="w-[16px] h-[16px]"
					/>
					<div className="flex items-center gap-1">
						<img src={DueNextDayIcon} className="w-[24px] h-[24px]" alt="" />
						<label
							htmlFor="due-in-the-next-day"
							className="text-[14px] text-[#172B4D]"
						>
							Due in the next day
						</label>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-3">
				<div className="text-[12px] text-[#44546F] font-semibold">Labels</div>
				<div className="flex gap-6 items-center px-3">
					<input
						type="checkbox"
						id="labels-marked-as-complete"
						className="w-[16px] h-[16px]"
					/>
					<div className="flex gap-1 items-center">
						<img src={NoLabelsIcon} className="w-[24px] h-[24px]" alt="" />
						<label
							htmlFor="labels-marked-as-complete"
							className="text-[14px] text-[#172B4D]"
						>
							Marked as complete
						</label>
					</div>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input type="checkbox" className="w-[16px] h-[16px]" />
					<div className="bg-[#4BCE97] h-[32px] w-[300px] rounded"></div>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input type="checkbox" className="w-[16px] h-[16px]" />
					<div className="bg-[#F5CD47] h-[32px] w-[300px] rounded"></div>
				</div>
				<div className="flex gap-6 items-center px-3">
					<input type="checkbox" className="w-[16px] h-[16px]" />
					<select
						name=""
						className="h-[32px] w-[300px] px-2 py-1 text-[14px] text-[#626F86]"
					>
						<option value="Select labels">Select labels</option>
					</select>
				</div>
			</div>
		</div>
	);
};
