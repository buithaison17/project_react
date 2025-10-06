import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, loginUser } from "../store/usersReducer";
import type { AppDispatch, RootState } from "../store/store";

export const LoginPage = () => {
	const { users } = useSelector((state: RootState) => state.usersReducer);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [inputState, setInputState] = useState({
		email: "",
		password: "",
	});
	useEffect(() => {
		dispatch(fetchData());
	});
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onSubmit = async () => {
		const { email, password } = inputState;
		if (!email.trim() || !password.trim()) {
			toast.error("Email hoặc mật khẩu không được để trống");
			return;
		}
		if (!email.includes("@")) {
			toast.error("Email không đúng định dạng");
			return;
		}
		const existingUser = users.find((user) => user.email === email);
		if (!existingUser?.email) {
			toast.error("Email không tồn tại");
			return;
		}
		if (existingUser?.password !== inputState.password) {
			toast.error("Mật khẩu không đúng");
			return;
		}
		dispatch(loginUser({ email, password }));
		navigate("/dashboard");
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
				<div className="mt-3 font-[26.8px] font-bold-[10px]">
					Please sign in
				</div>
				<div className="flex flex-col">
					<input
						value={inputState.email}
						onChange={handleInput}
						name="email"
						type="email"
						placeholder="Email address"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
					<input
						value={inputState.password}
						name="password"
						onChange={handleInput}
						type="password"
						placeholder="Password"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
				</div>
				<div>
					Don't have an account,&ensp;
					<span
						onClick={() => navigate("/register")}
						className="text-blue-600 cursor-pointer hover:underline"
					>
						click here!
					</span>
				</div>
				<button
					onClick={onSubmit}
					className="bg-blue-500 text-white rounded-md px-2 py-1"
				>
					Sign in
				</button>
				<div className="text-[#212529BF]">
					&copy; 2025 &sdot; Rikkei Education
				</div>
			</div>
		</div>
	);
};
