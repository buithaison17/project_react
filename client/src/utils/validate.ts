import { store } from "../store/store";

export const validateEmail = (email: string): boolean => {
	if (!email.trim()) return false;
	if (!email.includes("@")) return false;
	return true;
};

export const validateEmailForRegister = (email: string): boolean => {
	const state = store.getState();
	if (!validateEmail(email)) return false;
	if (state.usersReducer.users.some((user) => user.email === email))
		return false;
	return true;
};

export const validatePassword = (password: string): boolean => {
	if (!password.trim()) return false;
	if (password.length < 8) return false;
	return true;
};

export const validateUsername = (username: string): boolean => {
	if (!username.trim()) return false;
	return true;
};

export const validateLogin = (email: string, password: string): boolean => {
	const state = store.getState();
	if (!email.trim() || !password.trim()) return false;
	return state.usersReducer.users.some(
		(user) => user.email === email && user.password === password
	);
};
