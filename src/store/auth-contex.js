import React, { useState } from "react";

const AuthContext = React.createContext({
	token: "",
	id: 0,
	role: "",
	isLoggedIn: false,
	login: (token, id, role) => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);
	const [id, setId] = useState(0);
	const [role, setRole] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (token, id, role) => {
		setToken(token);
		setId(id);
		setRole(role);
	};

	const logoutHandler = () => {
		setToken(null);
		setId(0);
		setRole(null);
	};

	const contextValue = {
		token: token,
		id: id,
		role: role,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
