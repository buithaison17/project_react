import { useNavigate } from "react-router-dom";
import logo from "../assets/images/trello-logo.png";
import { SuccessMessage } from "../components/SuccessMessage";

export const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<div className="relative container h-screen flex justify-center items-center">
			<SuccessMessage></SuccessMessage>
			<div className="w-[400px] flex flex-col gap-4 max-sm:w-[300px]">
				<img src={logo} className="w-[150px] h-[42px] m-auto" alt="" />
				<div className="mt-3 font-[26.8px] font-bold-[10px]">
					Please sign in
				</div>
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
					Don't have an account,&ensp;
					<span
						onClick={() => navigate("/register")}
						className="text-blue-600 cursor-pointer hover:underline"
					>
						click here!
					</span>
				</div>
				<button className="bg-blue-500 text-white rounded-md px-2 py-1">
					Sign in
				</button>
				<div className="text-[#212529BF]">
					&copy; 2025 &sdot; Rikkei Education
				</div>
			</div>
		</div>
	);
};
