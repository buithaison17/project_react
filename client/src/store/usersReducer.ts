import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../utils/type";
import axios from "axios";
import { toast } from "react-toastify";

interface StateType {
	users: User[];
	currentUserId: string;
}

const initialState: StateType = {
	users: [],
	currentUserId: localStorage.getItem("currentUserId") || "",
};

export const fetchData = createAsyncThunk<User[]>("users/set", async () => {
	const response = await axios.get("http://localhost:8080/users");
	return response.data;
});

export const addUser = createAsyncThunk<User, User>(
	"users/add",
	async (user) => {
		const response = await axios.post("http://localhost:8080/users", user);
		return response.data;
	}
);

export const addBoard = createAsyncThunk<User, User>(
	"users/addBoard",
	async (user) => {
		try {
			const response = await axios.put(
				`http://localhost:8080/users/${user.id}`,
				user
			);
			toast("Thêm thành công");
			return response.data;
		} catch {
			toast.error("Đã xảy ra lỗi");
		}
	}
);

const usersSlice = createSlice({
	name: "usersSlice",
	initialState,
	reducers: {
		loginUser: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		): void => {
			const { email } = action.payload;
			const user = state.users.find((user) => user.email === email);
			if (user) {
				state.currentUserId = user.id;
				localStorage.setItem("currentUserId", user.id);
			}
		},
		logoutUser: (state): void => {
			state.currentUserId = "null";
			localStorage.removeItem("currentUserId");
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.users = action.payload;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.users = [...state.users, action.payload];
		});
		builder.addCase(addBoard.fulfilled, (state, action) => {
			const userIndex: number = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			state.users[userIndex] = action.payload;
		});
	},
});

export const { loginUser } = usersSlice.actions;
export default usersSlice.reducer;
