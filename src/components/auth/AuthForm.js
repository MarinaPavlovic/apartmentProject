import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-contex";

import classes from "./AuthForm.module.css";
import MessageModal from "../ui/MessageModal";
import Backdrop from "../apartments/Beckdrop";

const AuthForm = () => {
	const [username, setUserName] = useState(undefined);
	const [password, setPassword] = useState(undefined);
	const [errorCard, setErrorCard] = useState(false);

	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();

		setIsLoading(true);
		fetch("http://localhost:8080/auth/login", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				setIsLoading(false);
				if (res.status >= 400) {
					setErrorCard(true);
				}
				return res.json();
			})
			.then((data) => {
				authCtx.login(data.idToken, data.id, data.role);
				if (data.role === "HOST") {
					history.push("/myApartments");
				} else {
					history.push("/");
				}
			});
	};

	function closeError() {
		setErrorCard(false);
	}

	return (
		<div>
			<section className={classes.auth}>
				<h1>Login</h1>
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="username">Your Username</label>
						<input
							type="username"
							id="username"
							required
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">Your Password</label>
						<input
							type="password"
							id="password"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={classes.actions}>
						{!isLoading && (
							<button disabled={!username || !password}>Login</button>
						)}
						{isLoading && <p>Loading...</p>}

						<Link to="registration">
							<button type="button" className={classes.toggle}>
								Create new account
							</button>
						</Link>
					</div>
				</form>
			</section>
			{errorCard && (
				<MessageModal
					title="Login Faild"
					message="Check username or password."
					onCancle={closeError}
				/>
			)}
			{errorCard && <Backdrop onCancle={closeError} />}
		</div>
	);
};

export default AuthForm;
