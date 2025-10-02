import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";

export const RegisterPage = () => {
	const navigate = useNavigate();
	return (
		<div className="relative container h-screen flex justify-center items-center">
			<div className="w-[400px] flex flex-col gap-4 max-sm:w-[300px]">
				<img src={logo} className="w-[150px] h-[42px] m-auto" alt="" />
				<div className="mt-3 font-[26.8px] text-[#212529]">Please sign up</div>
				<div className="flex flex-col">
					<input
						type="email"
						placeholder="Email address"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
					<input
						type="text"
						placeholder="Username"
						className="border p-2 rounded-md hover:border-blue-500"
					/>
					<input
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
				<button className="bg-blue-500 text-white rounded-md px-2 py-1">
					Sign up
				</button>
				<div className="text-[#212529BF]">
					&copy; 2025 &sdot; Rikkei Education
				</div>
			</div>
		</div>
	);
};
