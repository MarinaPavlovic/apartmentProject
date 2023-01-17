import classes from "./ReservApartments.module.css";

function ReservApartments(props) {
	const date = new Date(props.startDay);
	const dateEnd = new Date(props.endDay);

	return (
		<div className={classes.content}>
			<ul>
				<li className={classes.reservation}>
					<h3>{props.name}</h3>
					<ul className={classes.list}>
						<li>
							<img src={props.images[0]} alt={props.name} />
						</li>
						<li>
							<h4>Start Day: </h4>
							<p>{date.toLocaleDateString("en-US")}</p>
							<h4>End Day: </h4>
							<p>{dateEnd.toLocaleDateString("en-US")}</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

export default ReservApartments;
