import { Budgets } from "./Budgets";
import { Dashboard } from "./Dashboard";
import { ErrorPage } from "./Error";
import { Login } from "./Login";
import { Root } from "./Main";
import { Register } from "./Register";
import { Transactions } from "./Transactions";

interface IRoutes {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element
}

const errorElement = <ErrorPage />;
export const routes : IRoutes[] = [
	{
		path: "/",
		element: <Root />,
		errorElement,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement
	},
	{
		path: "/register",
		element: <Register />,
		errorElement
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		errorElement
	},
	{
		path: "/transactions",
		element: <Transactions />,
		errorElement
	},
	{
		path: "/budgets",
		element: <Budgets />,
		errorElement
	}
];