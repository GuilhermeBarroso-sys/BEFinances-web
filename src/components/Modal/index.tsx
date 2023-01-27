import { ReactNode, useState } from "react";
import ReactModal from "react-modal";

export interface IModalProps {
  modalIsOpen : boolean,
  style?: Record<string, any>,
  onRequestClose: () => void
  children: ReactNode
}
export function Modal({modalIsOpen, style = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	}
}, onRequestClose, children} : IModalProps) {

	return (
		<div>
			
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={onRequestClose}
				style={style}
				ariaHideApp={false}
				contentLabel="Example Modal"
			>
				<div className="w-full flex justify-end">

					<svg onClick={onRequestClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-right cursor-pointer hover:text-gray-400 ">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
				{children}
			</ReactModal>
		</div>
	);
}