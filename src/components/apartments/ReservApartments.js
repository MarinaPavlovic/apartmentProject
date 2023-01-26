import classes from "./ReservApartments.module.css";
import AuthContext from "../../store/auth-contex";
import { useContext, useState } from "react";

function ReservApartments(props) {
	const date = new Date(props.startDay);
	const dateEnd = new Date(props.endDay);
	const authCtx = useContext(AuthContext);
	var url = "";
	const [username, setUsername] = useState("");
	if (authCtx.role === "HOST") {
		url = "http://localhost:8080/user/" + props.userId;
	} else {
		url = "http://localhost:8080/user/" + props.hostId;
	}
	fetch(url, {
		headers: {
			Authorization: "Bearer " + authCtx.token,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setUsername(data.username);
		});

	return (
		<div className={classes.component}>
			<h3>{props.name}</h3>
			<div className={classes.content}>
				<div className={classes.image}>
					<img src={props.images[0]} alt={props.name} />
				</div>
				<div className={classes.informations}>
					<p>
						{authCtx.role === "USER" ? (
							<>You make reserevation in apartment </>
						) : (
							<>You have reserevation in apartment </>
						)}
						<b>{props.name}</b> address{" "}
						<b>
							{props.address},{props.city},{props.country}
						</b>
						.
						<br />
						From <b>{props.startDay}</b> to <b>{props.endDay}</b> which is total{" "}
						<b>{props.totalDays}</b> days.
						<br />
						{authCtx.role === "HOST" && (
							<>
								User name: <b>{username}</b>
							</>
						)}
						{authCtx.role === "USER" && (
							<>
								Host name: <b>{username}</b>
							</>
						)}
						<br />
						Total price: <b>{props.totalPrice}</b>
					</p>
				</div>
			</div>
		</div>
	);
}

export default ReservApartments;
