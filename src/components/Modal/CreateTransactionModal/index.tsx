import { useForm } from "react-hook-form";
import { Modal } from "..";
import DatePicker from "react-datepicker";
import { ChangeEvent, useState } from "react";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
interface ICreateTransactionModalProps {
  modalIsOpen: boolean
  onRequestClose: () => void
  onCreate?: () => void 
}
interface IFields {
  description: string;
  category: string
  amount: number
}
export function CreateTransactionModal({modalIsOpen,onRequestClose, onCreate =  () => {null;}} : ICreateTransactionModalProps) {
	const { register, handleSubmit, reset} = useForm();
	const [date, setDate] = useState<Date>(new Date());
	async function onSubmit({description, category, amount} : IFields) {
		const {status} = await api.post("/users/transactions", {
			description,
			category,
			amount: amount * 1,
			date: date.toISOString()
		});
		if(status == 201) {
			Swal.fire("Success","Transaction created with success!", "success");
			reset();
			setDate(new Date());
			onCreate();

		} else {
			Swal.fire("Error","Something is wrong, try again later.", "error");

		}
	}
	return (
		<Modal modalIsOpen={modalIsOpen} onRequestClose={onRequestClose}>

			<form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
				<div className="text-center">
					<h1 className="text-center text-4xl mb-8 ">Create a transaction</h1>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="description">
      Description
					</label>
					<input
						className="border border-gray-400 p-2 w-full"
						type="text"
						{...register("description")}
						id="description"
						name="description"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="Category">
      Category
					</label>
					<input
						className="border border-gray-400 p-2 w-full"
						type="text"
						id="Category"
						name="Category"
						{...register("category")}

					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="Amount">
      Date
					</label>
				
					<DatePicker selected={date} onChange={(date:Date) => setDate(date)} />
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-2" htmlFor="Amount">
      Amount
					</label>
					<input
						className="border border-gray-400 p-2 w-full"
						type="number"
						id="Amount"
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