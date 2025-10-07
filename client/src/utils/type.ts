export type Status = "pending" | "success";

export interface Tag {
	id: string;
	content: string;
	color: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	status: Status;
	due_date: string;
	tag: [];
}

export interface List {
	id: string;
	title: string;
	created_at: string;
	tasks: Task[];
}

export interface Board {
	id: string;
	title: string;
	description: string;
	backdrop: string;
	is_starred: boolean;
	created_at: string;
	list: List[];
}

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	created_at: string;
	boards: Board[];
}
