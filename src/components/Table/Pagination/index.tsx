import { useEffect, useState } from "react";
interface IPaginationProps {
  onChangePage: (page : number) => void
  dataLength: number
  pageLimit?: number
}
export function Pagination({onChangePage  = ()=>null,   pageLimit = null} : IPaginationProps) {
	const [page, setPage] = useState(1);
	return (
		<div className="flex justify-between">
			<button onClick={() => {
				if(page > 1 ) {
					onChangePage(page - 1);
					setPage(page - 1);
				}
			}}>

				<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer hover:text-gray-500 ${page == 1 ? "text-gray-500 cursor-not-allowed" : ""}`}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
			</button>
			<button onClick={() => {
				if(page < pageLimit) {
					onChangePage(page + 1);
					setPage(page +1);
				}
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer hover:text-gray-500 ${pageLimit == page ? "text-gray-500 cursor-not-allowed" : ""}`}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
			</button>
		</div>
	);
}

