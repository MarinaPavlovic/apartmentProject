import classes from "./MessageModal.module.css";

const MessageModal = (props) => {
	return (
		<div className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<button onClick={props.onCancle}>Okay</button>
			</footer>
		</div>
	);
};

export default MessageModal;
