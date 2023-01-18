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
							{authCtx.role === "HOST" && (
								<div>
									<h4>User:</h4>
									<p>{username}</p>
								</div>
							)}
							{authCtx.role === "USER" && (
								<div>
									<h4>Host:</h4>
									<p>{username}</p>
								</div>
							)}
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

export default ReservApartments;
