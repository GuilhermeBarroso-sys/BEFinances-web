import rootUndrawChart from "../../assets/UndrawChart.svg";
import { Link } from "react-router-dom";
export function Root() {

	return (
		<section className="w-100">
			<div className="flex justify-center">

				<div className="w-3/4 ">
					<div className="flex items-center justify-center mt-8">
						<div className="w-min">
							<h1 className="lg:text-4xl xl:text-5xl 2xl:text-6xl sm:text-3xl  text-center text-gray-800 font-bold typewriter">Welcome to BEFinances</h1>
						</div>
					</div>
					<h3 className="2xl:text-3xl lg:text-2xl sm:text-xl mt-4 text-center text-gray-600 font-bold">Keep track of your expenses <span className="text-green-600 underline"> easily </span> </h3>
					<div className="w-100 sm:flex hidden justify-center mt-16 ">
						<div className="w-3/12  flex items-center justify-center ">
							<img  src = {rootUndrawChart} alt="chart image" />
						</div>
					</div>
					<div className="w-100 justify-center flex">
						<div className="flex 2xl:w-1/5 xl:w-2/5 lg:w-2/6 sm:w-6/12 w-4/5 justify-around items-baseline mt-12 ">
							<Link to={"register"} className="bg-gray-300 cursor-pointer rounded-md px-5 py-1">Register</Link>
							<h3>OR </h3>
							<Link to={"login"} className="bg-green-400 cursor-pointer rounded-md px-5 py-1">Login</Link>
              
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}