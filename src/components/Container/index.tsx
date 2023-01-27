import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode
}

export function Container({children} : IContainerProps) {
	return (
		<div className="bg-gray-200 min-h-screen flex flex-col">
			{children}
      
		</div>
	);
}