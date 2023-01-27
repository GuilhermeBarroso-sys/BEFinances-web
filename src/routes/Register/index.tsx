import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/RegisterForm";

export function Register() {
	return (
		<>   
			<div className="2xl:ml-16 xl:ml-16 lg:ml-16 md:ml-6 ml-4 mt-12">
				<Link to = "/">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
					</svg>
				</Link>
			</div>

			<div className="2xl:w-1/3 xl:w-1/3 lg:w-2/3 md:2/3 sm:w-full mx-auto">
				<h2 className="text-center text-3xl ">Register</h2>
				<RegisterForm />
			</div>
		</>
	);
}