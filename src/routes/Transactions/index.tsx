import { ReactNode, useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { api } from "../../services/api";

import { AuthContext } from "../../context/AuthContext";
import { Pagination } from "../../components/Table/Pagination";
import Swal from "sweetalert2";
import { DeleteButton } from "../../components/Table/Actions/DeleteButton";
import ReactModal from "react-modal";
import { Modal } from "../../components/Modal";
import { CreateTransactionModal } from "../../components/Modal/CreateTransactionModal";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
type ITransactionsData = {
  id: string;
  category: string;
  date: string;
  amount: number;
  description: string;
  user_id: string
}
type TRows = {
  id: string;
  category: string;
  date: string;
  amount: number;
  description: string;
  user_id: string
  actions?: ReactNode
}
export function Transactions() {
	const [transactions, setTransactions] = useState<ITransactionsData[]|[]>([]);
	const [datatable, setDatatable] = useState<ReactNode[]|[]>([]);
	const limit = 6;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [offset, setOffset] = useState<number>(0);
	const [pageLimit, setPageLimit] = useState<number|null>(null);
	const {user, isAuthenticated} = useContext(AuthContext);
	const cols = ["Description", "Category", "Date (M/D/Y)","Amount", "Actions"];
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	async function getAllUserTransactions() {
		const {data} = await api.get<ITransactionsData[]>(`/users/transactions/${user.id}`);		
		setTransactions(data);
	}

	function getDataTable() : ReactNode[] {
		const rows = offset ? transactions.slice(offset, offset + limit) : transactions.slice(offset, limit) ;
		return rows.map((row : TRows)=> {
			const dateSplit = row.date.split("T");
			const [rawDate] = dateSplit;
			const [year,month, day] = rawDate.split("-");
			const date = `${month}/${day}/${year}`;
			return (
        
				<tr key = {row.id} className="bg-gray-100 ">
					<td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.description}</td>
					<td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.category}</td>
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
	function handleDelete(row : TRows) {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to restore this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Delete!"
		}).then(async (response) => {
			if(response.isConfirmed) {
				await api.delete(`/users/transactions/${row.id}`);
				Swal.fire("Success!", "Record deleted with success!", "success");
				await getAllUserTransactions(); 
			}
		});
	}
	useEffect(() => {
		!isAuthenticated() && navigate("/");

		if(user) { 
			getAllUserTransactions();   
		}
	}, [user]);
	useEffect(() => {
		const [,modalOpen] = window.location.href.split("?");
		modalOpen == "modalOpen" && setIsModalOpen(true);
	}, []);
  
	useEffect(() => {
		setIsLoading(true);
		setPageLimit(Math.ceil(transactions.length / limit));
		setDatatable(getDataTable());
		setIsLoading(false);
	}, [transactions, offset]);
	const openModal = () => {setIsModalOpen(true);};
	const closeModal = () => {setIsModalOpen(false);};
	async function onCreate() {
		await getAllUserTransactions();
		closeModal();
	}
	return (
		<Container>
			<CreateTransactionModal onCreate={onCreate} modalIsOpen={isModalOpen}  onRequestClose={closeModal}/>
			<div className="w-full">
				<Header />
			</div>
			<section className="mt-16">
				<h1 className="text-center font-bold text-2xl">Your Transactions</h1>
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
									dataLength = {transactions.length} 
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