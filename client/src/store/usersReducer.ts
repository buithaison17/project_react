import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../utils/type";
import axios from "axios";

interface StateType {
	users: User[];
}

const initialState: StateType = {
	users: [],
};

const fetchData = createAsyncThunk<User[]>("users/set", async () => {
	const response = await axios.get("");
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
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.users = action.payload;
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.users = [...state.users, action.payload];
		});
	},
});

export default usersSlice.reducer;
