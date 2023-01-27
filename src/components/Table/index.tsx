import { ReactNode, useEffect, useState } from "react";
import { DeleteButton } from "./Actions/DeleteButton";
import Swal from "sweetalert2";



interface ITableProps {
  rows: ReactNode[],
  cols: ReactNode[]
  limit?: number
}
export function Table({rows, cols = []}: ITableProps) {

	return (
		<div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
			<table className="min-w-full divide-y divide-gray-200 text-sm">
				<thead className="bg-gray-100">
					<tr>
						{cols.map((header, index) => {
							return (
								<th key = {index}
									className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
								>
									<div className="flex items-center gap-2">
										{header}
  
									</div>
								</th>
							);
						})}
					
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200 ">
					{rows}				
				</tbody>
			</table>
		</div>
	);
}