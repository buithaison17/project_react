import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../utils/type";
import axios from "axios";

interface StateType {
	users: User[];
	currentUser: User | null;
}

const initialState: StateType = {
	users: [],
	currentUser: localStorage.getItem("currentUser")
		? JSON.parse(localStorage.getItem("currentUser")!)
		: null,
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

const usersSlice = createSlice({
	name: "usersSlice",
	initialState,
	reducers: {
		loginUser: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		): void => {
			const { email, password } = action.payload;
			const user = state.users.find(
				(user) => user.email === email && user.password === password
			);
			if (user) {
				state.currentUser = user;
				localStorage.setItem("currentUser", JSON.stringify(user));
			} else state.currentUser = null;
		},
		logoutUser: (state): void => {
			state.currentUser = null;
			localStorage.removeItem("currentUser");
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.users = action.payload;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.users = [...state.users, action.payload];
		});
	},
});

export const { loginUser } = usersSlice.actions;
export default usersSlice.reducer;
