import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { validateLogin } from "../utils/validate";

export const LoginPage = () => {
	const navigate = useNavigate();
	const [inputState, setInputState] = useState({
		email: "",
		password: "",
	});
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onSubmit = (): void => {
		if (!validateLogin(inputState.email, inputState.password)) {
			toast.error("Địa chỉ email hoặc mật khẩu không chính xác");
		}
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
