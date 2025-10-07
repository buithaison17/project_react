import { Header } from "../components/Header";
import { SidebarBoard } from "../components/SidebarBoard";
import { Outlet } from "react-router-dom";

export const Board = () => {
	return (
		<div className="h-screen w-screen flex flex-col">
			{/* Header */}
			<Header />
			{/* Body */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<SidebarBoard />
				{/* Content */}
				<Outlet></Outlet>
			</div>
			{/* <ModalTaskDetail></ModalTaskDetail> */}
			{/* <ModalLabel></ModalLabel> */}
			{/* <ModalCreateLabel></ModalCreateLabel> */}
			{/* <ModalMoveCard></ModalMoveCard> */}
		</div>
	);
};
