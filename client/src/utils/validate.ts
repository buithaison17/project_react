import { store } from "../store/store";

// chỉ check định dạng email
export const validateEmailFormat = (email: string): boolean => {
	if (!email.trim()) return false;
	if (!email.includes("@")) return false;
	return true;
};

// đăng ký: email phải đúng định dạng và chưa tồn tại
export const validateEmailForRegister = (email: string): boolean => {
	const state = store.getState();
	if (!validateEmailFormat(email)) return false;
	if (state.usersReducer.users.some((user) => user.email === email)) {
		return false; // đã tồn tại
	}
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

// đăng nhập: email phải đúng định dạng và tồn tại + password khớp
export const validateLogin = (email: string, password: string): boolean => {
	const state = store.getState();
	if (!validateEmailFormat(email) || !validatePassword(password)) return false;

	return state.usersReducer.users.some(
		(user) => user.email === email && user.password === password
	);
};
