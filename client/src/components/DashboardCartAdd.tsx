interface PropsType {
	handleAdd: () => void;
}

export const DashboardCartAdd = ({ handleAdd }: PropsType) => {
	return (
		<div
			onClick={handleAdd}
			className="h-[130px] bg-[#F1F2F4] border-gray-200 rounded-md flex justify-center items-center"
		>
			<button className="px-2 py-1 border border-[#6C757D] rounded-md text-[#6C757D]">
				Create new board
			</button>
		</div>
	);
};
