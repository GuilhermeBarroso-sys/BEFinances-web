import { useForm } from "react-hook-form";
import { Modal } from "..";
import DatePicker from "react-datepicker";
import { ChangeEvent, useState } from "react";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
interface ICreateBudgetModalProps {
  modalIsOpen: boolean
  onRequestClose: () => void
  onCreate?: () => void 
}
interface IFields {
  year: number;
  month: number
  amount: number
}
export function CreateBudgetModal({modalIsOpen,onRequestClose, onCreate =  () => {null;}} : ICreateBudgetModalProps) {
	const { register, handleSubmit, reset} = useForm();
	const onCreateStatusError = [
		{
			status: 409,
			message: "A budget already exist in this date",
			title: "Conflict!"
		}

	];
	const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	async function onSubmit({year, month, amount} : IFields) {
		try {
			await api.post("/users/budgets", {
				year: year.toString() ,
				month: month.toString() ,
				amount: amount * 1 ,
			});
			Swal.fire("Success","Budget created with success!", "success");
			reset();
			onCreate();
		} catch(err) {
			const statusExist = onCreateStatusError.find(response => response.status == err.response.status );
    
			statusExist ? Swal.fire(statusExist.title,statusExist.message, "error") : Swal.fire("Error","Something is wrong, try again later.", "error");
		}


		
	}

	return (
		<Modal modalIsOpen={modalIsOpen} onRequestClose={onRequestClose}>

			<form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
				<div className="text-center">
					<h1 className="text-center text-4xl mb-8 ">Create a Budget</h1>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="month">
            Month
					</label>
					<select
						className="border border-gray-400 p-2 w-full"
						id="month"
						required
						name="month"
						{...register("month", {min: 0})}

					>
						{months.map((value) => {
							return <option value={value} key={value}>{value}</option>;
						})}
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="year">
            Year
					</label>
					<input
						className="border border-gray-400 p-2 w-full"
						type="number"
						id="year"
						required
						min={2000}
						max={new Date().getFullYear()}
						name="year"
						{...register("year", {min: 0})}

					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="Amount">
            Amount
					</label>
					<input
						className="border border-gray-400 p-2 w-full"
						type="number"
						id="Amount"
						required
						min={0}
						name="Amount"
						{...register("amount", {min: 0})}

					/>
				</div>
				<button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
    Create
				</button>
			</form>
		</Modal>
	);
}