import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
	validateEmailForRegister,
	validatePassword,
	validateUsername,
} from "../utils/validate";
import { Bounce, toast, ToastContainer } from "react-toastify";
import type { User } from "../utils/type";
import { getDateNow } from "../utils/getDateNow";
import { addUser } from "../store/usersReducer";

export const RegisterPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [inputState, setInputState] = useState({
		email: "",
		username: "",
		password: "",
	});
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onSubmit = (): void => {
		let isCheck = true;
		if (
			!validateEmailForRegister(inputState.email) ||
			!validatePassword(inputState.password)
		) {
			toast.error("Địa chỉ email hoặc mật khẩu không đúng");
			isCheck = false;
		}
		if (!validateUsername(inputState.username)) {
			toast.error("Username không được để trống");
			isCheck = false;
		}
		if (isCheck) {
			const user: User = {
				id: Math.floor(Math.random() * 1000000).toString(),
				username: inputState.username.trim(),
				email: inputState.email.trim(),
				password: inputState.password.trim(),
				created_at: getDateNow(),
				boards: [],
			};
			dispatch(addUser(user));
			toast.success("Đăng kí thành công", {
				onClose: () => navigate("/login"),
			});
		}
	};
	return (
		<div className="relative container h-screen flex justify-center items-center">
			<ToastContainer
				position="top-left"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
			<div className="w-[400px] flex flex-col gap-4 max-sm:w-[300px]">
				<img src={logo} className="w-[150px] h-[42px] m-auto" alt="" />
				<div className="mt-3 font-[26.8px] text-[#212529]">Please sign up</div>
				<div className="flex flex-col">
					<input
						name="email"
						value={inputState.email}
						onChange={handleInput}
						type="email"
						placeholder="Email address"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
					<input
						type="text"
						name="username"
						value={inputState.username}
						onChange={handleInput}
						placeholder="Username"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
					<input
						name="password"
						value={inputState.password}
						onChange={handleInput}
						type="password"
						placeholder="Password"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
				</div>
				<div>
					Already have an account,&ensp;
					<span
						onClick={() => navigate("/login")}
						className="text-blue-600 cursor-pointer hover:underline"
					>
						click here!
					</span>
				</div>
				<button
					onClick={onSubmit}
					className="bg-blue-500 text-white rounded-md px-2 py-1"
				>
					Sign up
				</button>
				<div className="text-[#212529BF]">
					&copy; 2025 &sdot; Rikkei Education
				</div>
			</div>
		</div>
	);
};
