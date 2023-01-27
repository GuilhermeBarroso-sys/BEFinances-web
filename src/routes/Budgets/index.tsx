import { ReactNode, useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { api } from "../../services/api";

import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "../../components/Table/Pagination";
import Swal from "sweetalert2";
import { DeleteButton } from "../../components/Table/Actions/DeleteButton";
import { Spinner } from "../../components/Spinner";
import { CreateBudgetModal } from "../../components/Modal/CreateBudgetModal";
import { useNavigate } from "react-router-dom";
type IBudgetsData = {
  id: string;
  year: string;
  month: string;
  amount: string
  user_id: string;
}
type BRows = {
  id: string;
  year: string;
  month: string;
  amount: string
  user_id: string;
}
export function Budgets() {
	const [budgets, setBudgets] = useState<IBudgetsData[]|[]>([]);
	const [datatable, setDatatable] = useState<ReactNode[]|[]>([]);
	const limit = 6;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [offset, setOffset] = useState<number>(0);
	const [pageLimit, setPageLimit] = useState<number|null>(null);
	const {user} = useContext(AuthContext);
	const cols = ["Date (M/Y)","Amount", "Actions"];
	const [isLoading, setIsLoading] = useState(false);
	const {isAuthenticated} = useContext(AuthContext);
	const navigate = useNavigate();
	async function getAllUserBudgets() {
		const {data} = await api.get<IBudgetsData[]>("/users/budgets");		
		setBudgets(data);
	}

	function getDataTable() : ReactNode[] {
		const rows = offset ? budgets.slice(offset, offset + limit) : budgets.slice(offset, limit) ;
		return rows.map((row : BRows)=> {
			const date = `${row.month}/${row.year}`;
			return (
        
				<tr key = {row.id} className="bg-gray-100 ">
					{/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.category}</td> */}
					<td className="whitespace-nowrap px-4 py-2 text-gray-700">{date}</td>
					<td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.amount}</td>
					<td className="whitespace-nowrap px-4 py-2">
						<DeleteButton onClick={() => {handleDelete(row);}} />
					</td>
				</tr>
			);
		});

	}
	function handleDelete(row : BRows) {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to restore this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Delete!"
		}).then(async (response) => {
			if(response.isConfirmed) {
				await api.delete(`/users/budgets/${row.id}`);
				Swal.fire("Success!", "Record deleted with success!", "success");
				await getAllUserBudgets(); 
			}
		});
	}
	useEffect(() => {
		!isAuthenticated() && navigate("/");
		if(user) { 
			getAllUserBudgets();   
		}
	}, [user]);
	useEffect(() => {
		const [,modalOpen] = window.location.href.split("?");
		modalOpen == "modalOpen" && setIsModalOpen(true);
	}, []);
  
	useEffect(() => {
		setIsLoading(true);
		setPageLimit(Math.ceil(budgets.length / limit));
		setDatatable(getDataTable());
		setIsLoading(false);
	}, [budgets, offset]);
	const openModal = () => {setIsModalOpen(true);};
	const closeModal = () => {setIsModalOpen(false);};
	async function onCreate() {
		await getAllUserBudgets();
		closeModal();
	}
	return (
		<Container>
			<CreateBudgetModal onCreate={onCreate} modalIsOpen={isModalOpen}  onRequestClose={closeModal}/>
			<div className="w-full">
				<Header />
			</div>
			<section className="mt-16">
				<h1 className="text-center font-bold text-2xl">Your budgets</h1>
				<div className="flex flex-col items-center mt-6">
					<div className="w-3/4">
						<div className="">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 mb-3  text-green-600 rounded-full hover:cursor-pointer hover:text-green-500 "  onClick={openModal}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>	
					
						<div className={`mb-8 ${!datatable.length ? "text-center" : ""}`}>
							{isLoading ? <Spinner /> : <Table  rows={datatable} cols={cols}/>}
						</div>
						
						<div>
							{datatable.length ? (
								<Pagination 
									dataLength = {budgets.length} 
									onChangePage={(page) => {
										setOffset((page-1) * limit);
									}
									}
									pageLimit={pageLimit}
						
								/>
							) : <div></div>}
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
}