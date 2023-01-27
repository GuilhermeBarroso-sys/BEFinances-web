import { Card, LineChart as LineChartTremor, Title } from "@tremor/react";
import { monthParse } from "../../../utils/monthParse";
import { useEffect, useState } from "react";

interface ILineChart {
  chartData: Array<{
    month?: string;
    total?: number;
  }>
  
}
export function LineChart({chartData} : ILineChart) {
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(chartData.map(data => {
			return {
				total: data.total,
				month: monthParse[data.month] as string
			};
		}));

	}, [chartData]);
	const dataFormatter = (number: number) => {
		return "$"+ number;
	};
	return (
    
		<LineChartTremor
			data={data}
			dataKey="month"
			categories={["total"]}
			colors={["green"]}
			valueFormatter={dataFormatter}  
			marginTop="mt-6"         
			yAxisWidth="w-16"
		/>
	
	);
}