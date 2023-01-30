import { CircleChart } from "../../Chart/CircleChart";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";
import { DateRange } from "../../DateRange";
import { DateRangePickerValue } from "@tremor/react";


interface IBuildChartParams {
  userId : string
}
interface ICircleChart {
  category: string
  total: number
}
type TBudgetResponse = {
  id: string
  user_id: string
  year: string
  month: string
  amount: number
}
export interface IBudget {
  month: string;
  year: string;
  amount: number
}
export function ExpensesByCategory() {
	const dateNow = new Date();
	const handleStartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toISOString().slice(0, 10);
	const handleEndDate = new Date().toISOString().slice(0, 10);

	const [chartData, setChartData] = useState<ICircleChart[]>([]);
	const [startDate, setStartDate] = useState(handleStartDate);
	const [endDate, setEndDate] = useState(handleEndDate);
	const [budget, setBudget] = useState<IBudget|null>(null);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	async function buildChart({userId} : IBuildChartParams) {
		try {

			const {data} = await api.get<ICircleChart[]>(`/users/transactions/category/${userId}?start_date=${startDate}&end_date=${endDate}`);
			const expenses = data.reduce((sum, transaction) => sum + transaction.total, 0);
			setTotalExpenses(expenses);
			const sameMonth = startDate.slice(5, 7) == endDate.slice(5,7) ? startDate.slice(5,7) : null;
			const year = startDate.slice(0, 4);
			if(sameMonth) {
				const {data} = await api.get<TBudgetResponse[]>(`/users/budgets?month=${sameMonth}&year=${year}`);
				const [budget] = data;
				setBudget(budget);
			}
			setChartData(data);
		} catch( err) {
			setChartData([]);
		}
	}
	function onDateChange(value: DateRangePickerValue) {
		const dates = {
			startDate: null,
			endDate: null
		};
		const [startDateRaw, endDateRaw] = value;
		dates.startDate = startDateRaw.toISOString().slice(0, 10);
		endDateRaw ? dates.endDate = endDateRaw.toISOString().slice(0, 10) : dates.endDate = dates.startDate;
		const {startDate, endDate} = dates;
		setStartDate(startDate);
		setEndDate(endDate);
    
		
	}
	const {user} = useContext(AuthContext);
	useEffect(() => {
		if(user) {
		
			setIsLoading(true);
			buildChart({userId : user.id});
			setIsLoading(false);
		}
	}, [user, startDate, endDate]);
	return (
		<CircleChart 
			dataIsLoading={isLoading}
			data={chartData} 
			onDateChange={onDateChange} 
			budget={budget} 
			model="donut"
			totalExpenses={totalExpenses}
		/>);
  
}