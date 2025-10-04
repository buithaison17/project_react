import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface ColorItem {
	color: string;
	isChoose: boolean;
}

const initialColorRow: ColorItem[] = [
	{
		color: "#BAF3DB",
		isChoose: false,
	},
	{
		color: "#F8E6A0",
		isChoose: false,
	},
	{
		color: "#FEDEC8",
		isChoose: false,
	},
	{
		color: "#FFD5D2",
		isChoose: false,
	},
	{
		color: "#DFD8FD",
		isChoose: false,
	},
	{
		color: "#4BCE97",
		isChoose: false,
	},
	{
		color: "#F5CD47",
		isChoose: false,
	},
	{
		color: "#FEA362",
		isChoose: false,
	},
	{
		color: "#F87168",
		isChoose: false,
	},
	{
		color: "#9F8FEF",
		isChoose: false,
	},
];

export const ModalCreateLabel = () => {
	const [colorRow, setColorRow] = useState<ColorItem[]>(initialColorRow);
	const handleChoose = (list: ColorItem[], index: number): ColorItem[] => {
		return list.map((item, i) => ({ ...item, isChoose: i === index }));
	};
	const onChooseColor = (index: number): void => {
		setColorRow(handleChoose(colorRow, index));
	};
	return (
		<div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-[9999] flex justify-center items-center">
			<div className="w-[304px] bg-white p-3 rounded-lg">
				<div className="flex justify-between items-center">
					<ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
					<div className="text-[14px] font-semibold text-[#44546F]">
						Create label
					</div>
					<CloseIcon fontSize="small"></CloseIcon>
				</div>
				<div className="flex flex-col gap-2 mt-3">
					<div className="text-[12px] font-semibold text-[#44546F]">Title</div>
					<input
						type="text"
						className="border h-[36px] rounded shadow px-2 hover: border-blue-500"
					/>
					<div className="text-[12px] font-semibold text-[#44546F]">
						Select a color
					</div>
					<div className="grid grid-cols-5 gap-2 pb-4 border-b border-b-gray-300">
						{colorRow.map((item, index) => (
							<div
								onClick={() => onChooseColor(index)}
								key={index}
								style={{ backgroundColor: `${item.color}` }}
								className={`h-[32px] rounded cursor-pointer ${
									item.isChoose ? "border-2 border-blue-500" : ""
								}`}
							></div>
						))}
					</div>
				</div>
				<button className="mt-3 px-3 py-2 bg-[#0C66E4] text-white rounded">
					Create
				</button>
			</div>
		</div>
	);
};
