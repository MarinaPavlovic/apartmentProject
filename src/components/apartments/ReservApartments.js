import classes from "./ReservApartments.module.css";
import AuthContext from "../../store/auth-contex";
import { useContext, useState } from "react";
import DeleteCard from "../ui/DeleteCard";

function ReservApartments(props) {
	const authCtx = useContext(AuthContext);
	const [deleteCard, setDeleteCard] = useState(false);
	const token = authCtx.token;

	var url = "";
	const [username, setUsername] = useState("");
	const reservationId = props.reservationId;
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
			if (response.status < 400) {
				return response.json();
			} else {
				setUsername("User delete profile.");
			}
		})
		.then((data) => {
			setUsername(data.username);
		});

	function closeDeleteCard() {
		setDeleteCard(false);
	}

	function deleteReservation() {
		fetch("http://localhost:8080/reservations/" + reservationId, {
			method: "DELETE",
			headers: { Authorization: "Bearer " + token },
		}).then((res) => {
			if (res.status < 400) {
				setDeleteCard(false);
			}
		});
	}
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
					{authCtx.role === "USER" && (
						<div>
							<button className={classes.editButton}>Edit</button>
							<button
								onClick={() => {
									setDeleteCard(true);
								}}
								className={classes.deleteButton}
							>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
			{deleteCard && (
				<DeleteCard
					title="Delete"
					message="Are you sure you want to delete reservation?."
					onCancle={closeDeleteCard}
					onDelete={deleteReservation}
				/>
			)}
		</div>
	);
}

export default ReservApartments;
