import { Card, Title, DonutChart, DateRangePickerValue, Text, Metric, Flex, BadgeDelta, Badge } from "@tremor/react";
import { DateRange } from "../../DateRange";
import { IBudget } from "../../Expenses/ExpensesByCategory";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../Spinner";



const valueFormatter = (number: number) => (
	`$ ${Intl.NumberFormat("us").format(number).toString()}`
);

export type CircleChartData = {
  category: string
  total: number
}
interface ICircleChart {
  data: Array<CircleChartData>
  onDateChange?: (value : DateRangePickerValue) => void
  model?: "all" | "donut" | "pie"
  budget?: IBudget | null
  totalExpenses: number
  dataIsLoading: boolean
}


export function CircleChart({data, onDateChange, model = "donut", budget, totalExpenses, dataIsLoading} : ICircleChart) {
  
	const [isOverBudget, setIsOverBudget] = useState(false);
	const [budgetRate, setBudgetRate] = useState("");
	const [percent, setPercent]  = useState(0);

	useEffect(() => {
		if(budget) {
			const percent = ((totalExpenses * 100) / budget.amount).toFixed(0);
			setBudgetRate(percent);
			setIsOverBudget(parseInt(percent) > 100);
			setPercent(parseInt(percent));
		}
	}, [budget]);
	return (
		<Card maxWidth="max-w-lg" hFull>
	
			<span className="text-center"><Title >Expenses By Category</Title> </span>
			<div className="my-3">
				<DateRange  onDateChange= {onDateChange}/>
			</div>
			{dataIsLoading ?<div className="flex w-full  items-baseline"><Spinner/></div>  :<div className="flex w-full  items-baseline">
				{(model == "donut" || model == "all") && (<DonutChart
					data={ data }
					category="total"
					showAnimation={true}
					dataKey="category"
					valueFormatter={ valueFormatter }
					marginTop="mt-6"
					colors={[ "violet", "indigo", "amber", "rose", "blue", "green" , "pink", "purple", "red"]}
				/>)}
				{(model == "pie" || model == "all") && (<DonutChart
					data={ data }
					category="total"
					showAnimation={true}
					dataKey="category"
					variant="pie"
					valueFormatter={ valueFormatter }
					marginTop="mt-6"
					colors={[ "violet", "indigo", "amber", "rose", "blue", "green" , "pink", "purple" , "cyan"]}
				/>)}
			</div>}
			<div className="flex w-full mt-8">
				{budget && (
					<Card maxWidth="max-w-xs" decoration="top" decorationColor={percent <= 80 ? "emerald" : percent > 100 ? "red" : "yellow"}>
						<Flex justifyContent="justify-between" alignItems="items-center">
							<Text>Budget ({budget.month}/{budget.year})</Text>
							{isOverBudget 
								?(	<BadgeDelta
									deltaType="moderateIncrease"
									text={`${budgetRate}%`}
									isIncreasePositive={false}
									tooltip="Overbudget! Be careful with your expenses"
									size="xs"
								/>)
								: (
									<Badge
										text={`${budgetRate}%`}
										color={percent > 80 ? "yellow" : "green"}
										size="sm"
										icon={undefined}
										tooltip={percent > 80 ? "Budget Rate - Be careful! Your budget is almost exhausted " :"Budget rate"}
										marginTop="mt-0" />
								)
							}
						
							

						</Flex>
						<Metric>$ {budget.amount}</Metric>
					</Card>
				)}
			</div>
			{(!data.length && !dataIsLoading) && <h3 className="text-center text-sm mt-4">Looks like you don't have any transactions on these date range, <Link className="text-blue-600" to ="/transactions?modalOpen">click here to create one </Link></h3>}
		</Card>
	);
}