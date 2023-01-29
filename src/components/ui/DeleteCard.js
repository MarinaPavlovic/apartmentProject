import classes from "./DeleteCard.module.css";

const DeleteCard = (props) => {
	return (
		<div className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<button onClick={props.onDelete}>Delete</button>
				<button onClick={props.onCancle}>Cancle</button>
			</footer>
		</div>
	);
};

export default DeleteCard;
