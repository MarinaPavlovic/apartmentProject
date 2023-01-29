import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MessageModal from "../ui/MessageModal";
import Backdrop from "../apartments/Beckdrop";

const Registration = () => {
	const nameInputRef = useRef();
	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [role, setRole] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [errorCard, setErrorCard] = useState(false);
	const [message, setMessage] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredUsername = usernameInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (role) {
			setRole("HOST");
		} else {
			setRole("USER");
		}
		setIsLoading(true);
		fetch("http://localhost:8080/auth/registration", {
			method: "POST",
			body: JSON.stringify({
				fullName: enteredName,
				username: enteredUsername,
				password: enteredPassword,
				email: enteredEmail,
				role: role,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				setIsLoading(false);
				if (res.status >= 400) {
					setErrorCard(true);
				} else {
					setMessage(true);
				}
			})
			.then((data) => {});
	};

	function closeError() {
		setErrorCard(false);
	}
	function closeMessage() {
		setMessage(false);
	}

	return (
		<div>
			<section className={classes.auth}>
				<h1>Sign Up</h1>
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input type="text" id="name" required ref={nameInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="username">Your Username</label>
						<input type="text" id="username" required ref={usernameInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="emailReg">Your Email</label>
						<input type="email" id="emailReg" required ref={emailInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="passwordReg">Your Password</label>
						<input
							type="password"
							id="passwordReg"
							required
							ref={passwordInputRef}
						/>
					</div>

					<div className={classes.control}>
						<label htmlFor="role">For what you want to use this site?</label>

						<input
							type="radio"
							id="contactChoice1"
							name="contact"
							value="HOST"
							onChange={(e) => setRole(e.target.value)}
						/>
						<label htmlFor="Choice1">I want to be a host.</label>
						<input
							type="radio"
							id="contactChoice2"
							name="contact"
							value="USER"
						/>
						<label htmlFor="Choice1">I want to rent an apartments.</label>
					</div>

					<div className={classes.actions}>
						{!isLoading && <button>Create Account</button>}
						{isLoading && <p>Loading...</p>}
						<Link to="/auth">
							<button type="button" className={classes.toggle}>
								Login with existing account
							</button>
						</Link>
					</div>
				</form>
			</section>
			{errorCard && (
				<MessageModal
					title="Registration Faild"
					message="Try diferent username or check if you already have an account."
					onCancle={closeError}
				/>
			)}
			{errorCard && <Backdrop onCancle={closeError} />}
			{message && (
				<MessageModal
					title="Registration"
					message="You crate a new profile, you can now log in."
					onCancle={closeMessage}
				/>
			)}
			{message && <Backdrop onCancle={closeMessage} />}
		</div>
	);
};

export default Registration;
