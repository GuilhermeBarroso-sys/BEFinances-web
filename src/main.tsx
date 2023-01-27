import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/global.css";
import "./css/animations.css";
import "react-datepicker/dist/react-datepicker.css";

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
const router = createBrowserRouter([
	...routes
]);

import "@tremor/react/dist/esm/tremor.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
);
