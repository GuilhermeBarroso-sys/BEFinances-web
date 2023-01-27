import { createContext, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";
type User = {
	id: string
  username: string,
  email: string,
}
type AuthResponse = {
	token: string;
	user: User;
}
type AuthContextData = {
	user: User|null;
	signOut: () => void;
	login: ({email,password}:ILogin) => Promise<boolean>
	register: ({username,email,password}:IRegister) => Promise<boolean>
	isAuthenticated: () =>  boolean;
}
interface ILogin {
	email: string;
	password: string;
}
type RegisterResponse = {
	username: string;
	email: string;
}
interface IRegister {
	username:     string
	email:    string;
	password: string;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
	children: ReactNode;
}

export function AuthProvider(props : AuthProvider) {
	const [user, setUser] = useState<User|null>(null);

	async function login({email,password}: ILogin)  {
		try {
			const response = await api.post<AuthResponse>("users/authenticate", {
				email,
				password
			});
			const {token,user} = response.data;
			localStorage.setItem("@BEFinances:token", token);
			localStorage.setItem("@BEFinances:userId", user.id);
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
			return true;
		} catch({response}) {
			return false;
		}
	}

	async function register({username,email,password}:IRegister) {
		try {
			await api.post<RegisterResponse>("users", {
				username,
				email,
				password,
			});
			return true;
		} catch({response}) {
			return false;
		}	
	}

	function signOut() {
		setUser(null);
		localStorage.removeItem("@BEFinances:token");
		return true;
	}

	function isAuthenticated() {
		const token = localStorage.getItem("@BEFinances:token");
		if(!token) {
			return false;
		}
		api.defaults.headers.common.authorization = `Bearer ${token}`;
		return true;
	}

	useEffect(() => {
		// return () => { // a return because react call the useEffect twice
		const token = localStorage.getItem("@BEFinances:token");
		const id = localStorage.getItem("@BEFinances:userId");
		if(token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;

			api.get<User>(`users/${id}`)
				.then(({data}) => {
					setUser(data);
				})
				.catch((err) => {
					// console.log(err.message);
				});
			// }
		}
	},[]);

	return (
		<AuthContext.Provider value ={{user, signOut, login, register, isAuthenticated}}>
			{props.children}
		</AuthContext.Provider>
	);
}