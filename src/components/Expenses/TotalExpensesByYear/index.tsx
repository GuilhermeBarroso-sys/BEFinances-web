import { Card, Dropdown, DropdownItem, Text, Title } from "@tremor/react";
import { LineChart } from "../../Chart/LineChart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";
import { Spinner } from "../../Spinner";
interface IBuildChartParams {
  userId : string
}
type TAllTransactions = {
  id: string
  user_id: string;
  date: string;
  category: string
  description: string
  amount: number
}
interface ILineChart {
  month?: string,
  total?: number
}

export function TotalExpensesByYear() {
	const {user} = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean|null>(null);
	const [chartData, setChartData] = useState<ILineChart[]>([]);
	const [years, setYears] = useState([]);
	const [isEmptyData, setIsEmptyData] = useState(false);
	const [selectedYear, setSelectedYear] = useState("All");
	async function buildChart({userId} : IBuildChartParams) {
		const {data} = await api.get<TAllTransactions[]>(`/users/transactions/${userId}`);
		const handleData : ILineChart[] = [
			{month: "01", total: 0},
			{month: "02", total: 0},
			{month: "03", total: 0},
			{month: "04", total: 0},
			{month: "05", total: 0},
			{month: "06", total: 0},
			{month: "07", total: 0},
			{month: "08", total: 0},
			{month: "09", total: 0},
			{month: "10", total: 0},
			{month: "11", total: 0},
			{month: "12", total: 0},

		];
		const yearsHandle = [];
    
		for(const transaction of data) {
			const month = transaction.date.slice(5, 7);
			const year = transaction.date.slice(0, 4);
			if(!yearsHandle.includes(year)) {
				yearsHandle.push(year);
			}
			if(selectedYear === "All") {
				const dateIndex = handleData.findIndex(data => data.month == month);
				handleData[dateIndex].total += transaction.amount;	
			} else {
				const dateIndex = handleData.findIndex(data => data.month == month && year == selectedYear);
				dateIndex != -1 ? handleData[dateIndex].total += transaction.amount : null;	
			}

		}
		setYears(["All",...yearsHandle]);
		setChartData(handleData);
		setIsEmptyData(data.length ? false : true);
	}
	useEffect(() => {
		if(user) {
			setIsLoading(true);
			buildChart({userId : user.id});
			setIsLoading(false);
		}
	}, [user, selectedYear]);
	return (
		<Card maxWidth="max-w-lg">
			<span className="text-center"><Title>Total Expenses By Year</Title> </span>
			{years.length > 1 && (
				<>
					<Text>Select the Year</Text>
					<Dropdown
						
						onValueChange={ (value: string) => setSelectedYear(value) }
						marginTop="mt-2"
						placeholder="Year"
						defaultValue={"All"}
					>
						{years.map((year) => {

							return <DropdownItem key={year}  value={ year } text={year}/>;
						})}
					</Dropdown>
				</>
			)}
			{isLoading ? <Spinner />:<LineChart chartData = {chartData}/>}
			{(isEmptyData && !isLoading) && <h3 className="text-center text-sm mt-4">Looks like you don't have any transactions, <Link className="text-blue-600" to ="/transactions?modalOpen">click here to create one </Link></h3>}
		</Card>

	);
}