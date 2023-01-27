
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { CircleChart } from "../../components/Chart/CircleChart";
import { ExpensesByCategory } from "../../components/Expenses/ExpensesByCategory";
import { TotalExpensesByYear } from "../../components/Expenses/TotalExpensesByYear";
import { Header } from "../../components/Header";
import { ColGrid, Col, Card, Text, Metric } from "@tremor/react";
import { Table } from "../../components/Table";
import { Container } from "../../components/Container";
import { Spinner } from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
export function Dashboard() {
	const {isAuthenticated} = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		!isAuthenticated() && navigate("/");
	}, []);
	return (
		<Container>
			<div className="w-full">
				<Header />
			</div>
			<div className="flex flex-col justify-center 2xl:flex-row xl:flex-row mt-8">
				<div className="w-full flex  my-4">
					<ExpensesByCategory /> 
				</div>
				
				<div className=" w-full my-4" > 
					<TotalExpensesByYear /> 
				</div>
			
			</div>
		</Container>
			
		

      
    
	);
}