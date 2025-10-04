import IconWarning from "../assets/images/icon-warning.png";

export const ModalDelete = () => {
	return (
		<div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-[9999]">
			<div className="w-[512px] bg-white rounded-md p-8 flex flex-col justify-center items-center gap-3">
				<img src={IconWarning} className="w-[88px] h-[88px]" alt="" />
				<div className="text-[30px] text-[#545454] font-semibold">
					Are you sure?
				</div>
				<div className="text-[18px] text-[#545454]">
					You won't be able to revert this!
				</div>
				<div className="flex gap-3">
					<button className="p-2 bg-[#3085D6] rounded-[4px] text-white">
						Yes, delete it!
					</button>
					<button className="p-2 bg-[#DD3333] rounded-[4px] text-white">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
