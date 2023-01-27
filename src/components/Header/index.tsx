import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

type PageName = "" | "Dashboard" | "Transactions" | "Budgets"
export function Header() {
	const {user, signOut} = useContext(AuthContext);
	const pageName : Array<PageName> = ["Dashboard", "Transactions", "Budgets"];
	const [currentPage, setCurrentPage] = useState<PageName>("");
	function setPageName() {
		const url = window.location.href.toLowerCase();

		for(const page of pageName) {
		
			if(url.includes(page.toLowerCase())) {
				setCurrentPage(page);
			}
		}
	}
	useEffect(() => {
		setPageName();
	}, []);
	return (
		<header className="bg-green-500 px-8 py-4 flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-col flex-col w-full items-baseline">


			<div className="w-full"><h1 className="text-white  2xl:text-left xl:text-left lg:text-left md:text-center sm:text-center text-center font-bold text-2xl ">BEFinances</h1></div>
			<div className="2xl:w-3/5 xl:w-3/4 lg:w-full md:w-full sm:w-full w-full">
				<nav>
					<ul className="list-none w-full flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col items-baseline justify-center 2xl:my-0 xl:my-0 lg:my-0 md:my-4 sm:my-4 my-4 flex-col text-center">
						{pageName.map((page) => {
							return (
								<div key = {page} className="w-full">
									<li ><Link className = {` ${currentPage === page ? "text-blue-600 hover:text-blue-500" : "text-white hover:text-green-100"}  font-normal text-lg cursor-pointer `} to = {`/${page.toLowerCase()}`}> {page}</Link></li>
								</div>
							);
						})}
			
					</ul>
				</nav>
			</div>
			<div className="w-full 2xl:text-right xl:text-right lg:text-right md:text-center sm:text-center text-center"><Link  to = "/" onClick={signOut} className="text-white text-lg font-black hover:text-green-100 cursor-pointer">Exit</Link></div>


		</header>
	);
}