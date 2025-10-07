import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { Bounce, toast, ToastContainer } from "react-toastify";
import type { User } from "../utils/type";
import { getDateNow } from "../utils/getDateNow";
import { addUser, fetchData } from "../store/usersReducer";

export const RegisterPage = () => {
	const { users } = useSelector((state: RootState) => state.usersReducer);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [inputState, setInputState] = useState({
		email: "",
		username: "",
		password: "",
	});
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onSubmit = async () => {
		if (!inputState.email.trim() || !inputState.password.trim()) {
			toast.error("Email hoặc mật khẩu không được để trống");
			return;
		}
		if (!inputState.username.trim()) {
			toast.error("Username không được để trống");
			return;
		}
		if (!inputState.email.includes("@")) {
			toast.error("Email không đúng định dạng");
			return;
		}
		if (users.some((user) => user.email === inputState.email)) {
			toast.error("Email đã tồn tại");
			return;
		}
		const user: User = {
			id: Math.floor(Math.random() * 1000000).toString(),
			username: inputState.username.trim(),
			email: inputState.email.trim(),
			password: inputState.password.trim(),
			created_at: getDateNow(),
			boards: [],
		};
		try {
			await dispatch(addUser(user)).unwrap();
			toast.success("Đăng ký thành công", {
				onClose: () => navigate("/login"),
			});
		} catch {
			toast.error("Đã có lỗi xảy ra");
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
						className="border p-2 rounded-md hover:border-blue-500 focus:border-blue-500 focus:outline-none"
					/>
					<input
						type="text"
						name="username"
						value={inputState.username}
						onChange={handleInput}
						placeholder="Username"
						className="border p-2 rounded-md hover:border-blue-500 focus:border-blue-500 focus:outline-none"
					/>
					<input
						name="password"
						value={inputState.password}
						onChange={handleInput}
						type="password"
						placeholder="Password"
						className="border p-2 rounded-md hover:border-blue-500 focus:border-blue-500 focus:outline-none"
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
