import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface IFields {
  username: string;
  email: string;
  password: string
}

export function RegisterForm() {
	const { register, handleSubmit, watch} = useForm();
	const navigate = useNavigate();
	const {register : registerUser, login} = useContext(AuthContext);
	const [isInvalidPassword, setIsInvalidPassword] = useState(true);
	async function onSubmit({username,email, password} : IFields) {
		const successfulRegister = await registerUser({username, email, password});
		if(successfulRegister) {
			const successfulLogin = await login({email,password});
			successfulLogin ? navigate("/dashboard") : Swal.fire("Error", "Something is wrong, please try again later", "error");

		}else {

			Swal.fire("Error", "Please, verify the fields and try again!", "error");
		}
      
	}
	return (

		<form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label className="block text-gray-700 font-medium mb-2" htmlFor="email">
      Name
				</label>
				<input
					className="border border-gray-400 p-2 w-full"
					{...register("username", {required: true})}
					id="username"
					name="username"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-medium mb-2" htmlFor="email">
      Email
				</label>
				<input
					className="border border-gray-400 p-2 w-full"
					type="email"
					{...register("email", {
						pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						required: true
					})}
					id="email"
					name="email"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-medium mb-2" htmlFor="password">
      Password
				</label>
				<input
					className="border border-gray-400 p-2 w-full"
					type="password"
					id="password"
					name="password"
					{...register("password", {
						onChange: (event : React.ChangeEvent<HTMLInputElement>) => {
							const {value} = event.target;
						
							if(value.length < 6) {
								setIsInvalidPassword(true);
							} else {
								setIsInvalidPassword(false);
							}
						},
						required: true
					})}
					

				/>
				<small className={isInvalidPassword ? "text-red-500" : "text-green-500"}>The password must to be 6 or more characteres</small>
			</div>
			<button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
    Sign In
			</button>
		</form>

	);
}