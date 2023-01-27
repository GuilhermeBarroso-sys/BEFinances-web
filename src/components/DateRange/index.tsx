import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
interface IDateRangeProps {
  onDateChange?: (value: DateRangePickerValue) => void
}
export function DateRange({onDateChange} : IDateRangeProps) {
	const dateNow = new Date();
	return (

		<DateRangePicker
			placeholder="Select a date range"
			onValueChange={onDateChange}
			defaultValue={[new Date(dateNow.getFullYear(), dateNow.getMonth(), 1), new Date()]}
		
		/>
	);
}