import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

interface ImageItem {
	image: string;
	isChoose: boolean;
}

interface ColorItem {
	from: string;
	to: string;
	isChoose: boolean;
}

const initialImageRow: ImageItem[] = [
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378225/m2zskmrawqpvxnvsuetr.jpg",
		isChoose: false,
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378161/jtoihhg4izrph1rcrlxq.jpg",
		isChoose: false,
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378938/tv6klliekufan47mzmdy.jpg",
		isChoose: false,
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378951/zgjhcdp7zqdubp5rrcfo.jpg",
		isChoose: false,
	},
];

const initialColorRow: ColorItem[] = [
	{
		from: "#FFB100",
		to: "#FA0C00",
		isChoose: false,
	},
	{
		from: "#2609FF",
		to: "#D20CFF",
		isChoose: false,
	},
	{
		from: "#00FF2F",
		to: "#00FFC8",
		isChoose: false,
	},
	{
		from: "#00FFE5",
		to: "#004BFA",
		isChoose: false,
	},
	{
		from: "#FFA200",
		to: "#EDFA00",
		isChoose: false,
	},
	{
		from: "#FF00EA",
		to: "#FA0C00",
		isChoose: false,
	},
];

export const ModalAddEditBoard = () => {
	const [imageRow, setImageRow] = useState<ImageItem[]>(initialImageRow);
	const [colorRow, setColorRow] = useState<ColorItem[]>(initialColorRow);
	const handleChoose = <T extends { isChoose: boolean }>(
		list: T[],
		index: number
	): T[] => {
		return list.map((item, i) => ({ ...item, isChoose: i === index }));
	};
	const onChooseImage = (index: number): void => {
		setImageRow(handleChoose(imageRow, index));
	};
	const onChooseColor = (index: number): void => {
		setColorRow(handleChoose(colorRow, index));
	};
	return (
		<div className="fixed inset-0 flex justify-center items-center z-[9999]">
			{/* Overlay */}
			<div className="fixed inset-0 h-screen w-screen bg-[rgba(0,0,0,0.3)]" />

			{/* Content */}
			<div className="relative z-[10000] py-3 bg-white rounded-md shadow-xl w-[500px]">
				<div className="flex justify-between items-center p-3 border-b border-b-gray-300">
					<div className="text-[20px] font-bold">Create Board</div>
					<ClearIcon></ClearIcon>
				</div>
				<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
					<div className="text-[20px] font-bold text-[#212529]">Background</div>
					<div className="grid grid-cols-4 gap-1">
						{imageRow.map((item, index) => (
							<div
								onClick={() => onChooseImage(index)}
								key={index}
								className="relative"
							>
								<img
									src={item.image}
									className="w-[108px] rounded-md h-[60px]"
								/>
								{item.isChoose && (
									<CheckCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
								)}
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
					<div className="text-[20px] text-[#212529] font-bold">Color</div>
					<div className="grid grid-cols-6 gap-1">
						{colorRow.map((item, index) => (
							<div
								key={index}
								onClick={() => onChooseColor(index)}
								style={{
									backgroundImage: `linear-gradient(to bottom, ${item.from}, ${item.to})`,
								}}
								className={`h-[40px] rounded-md flex justify-center items-center`}
							>
								{item.isChoose && <CheckCircleIcon className="text-white" />}
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2 px-3 py-4 border-b border-b-gray-300">
					<div className="text-[18px] font-bold text-[v]">Board title</div>
					<input
						type="text"
						className="py-[12px] px-3 text-[16px] text-[#212529] border rounded-md hover:border-blue-500"
					/>
					<div className="text-[16px] font-normal text-[#212529]">
						👋 Please provide a valid board title.
					</div>
				</div>
				<div className="flex gap-3 justify-end items-center py-4 px-3">
					<button className="px-2 py-1 border text-[16px] border-[#DC3545] rounded-md text-[#DC3545]">
						Close
					</button>
					<button className="px-2 py-1 border text-[16px] border-[#0D6EFD] rounded-md text-[#0D6EFD]">
						Create
					</button>
				</div>
			</div>
		</div>
	);
};
