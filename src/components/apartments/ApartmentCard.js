import classes from "./ApartmentCard.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-contex";
import ReservationCalendar from "./ReservationCalendar";
import MessageModal from "../ui/MessageModal";

function ApartmentCard(props) {
	const user = useContext(AuthContext);
	const [imageNum, setImageNum] = useState(0);
	const [endDay, setEndDay] = useState(new Date());
	const [startDay, setStartDay] = useState(new Date());
	const apartmentId = props.id;
	const userId = user.id;
	const token = user.token;
	const hostId = props.userId;
	const [message, setMessage] = useState(false);
	const [error, setError] = useState(false);

	const createReservation = (e) => {
		e.preventDefault();

		fetch("http://localhost:8080/reservations/create", {
			method: "POST",
			body: JSON.stringify({
				userId: userId,
				hostId: hostId,
				apartmentId: apartmentId,
				startDay: startDay,
				endDay: endDay,
			}),
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status >= 400) {
				setError(true);
			} else {
				setMessage(true);
			}
		});
	};

	function closeError() {
		setError(false);
	}

	function closeMessage() {
		setMessage(false);
	}

	return (
		<div className={classes.item}>
			<div className={classes.image}>
				{imageNum !== 0 && (
					<button
						className={classes.prev}
						onClick={(e) => setImageNum(imageNum - 1)}
					>
						&lt;
					</button>
				)}
				<img src={props.images[imageNum].imageURL} alt={props.name} />
				{imageNum !== props.images.length - 1 && (
					<button
						className={classes.next}
						onClick={(e) => setImageNum(imageNum + 1)}
					>
						&gt;
					</button>
				)}
			</div>
			<div className={classes.content}>
				<p>
					<b>{props.name}</b>
				</p>
				<address>
					{props.adres + ", " + props.city + ", " + props.country}
				</address>
				<p>{props.description}</p>
				<p>
					<b>{props.pricePerNight}$</b>
				</p>
			</div>

			<div className={classes.avDays}>
				<h3>You want to visit us?</h3>
				{user.isLoggedIn ? (
					<>
						<ReservationCalendar
							apartmentId={apartmentId}
							startDay={startDay}
							setStartDay={(startDay) => setStartDay(startDay)}
							endDay={endDay}
							setEndDay={(endDay) => setEndDay(endDay)}
						/>
						<button onClick={createReservation}>Confirm</button>
					</>
				) : (
					<p>If you want to make reservation you must be loged in.</p>
				)}
			</div>
			<div className={classes.actions}>
				<button onClick={props.onCancle}>Close</button>
			</div>
			{error && (
				<MessageModal
					title={"Error"}
					message={"Something went wrong , check dates you entered in."}
					onCancle={closeError}
				/>
			)}
			{message && (
				<MessageModal
					title={"Reservation"}
					message={"Your reservation has been made!"}
					onCancle={closeMessage}
				/>
			)}
		</div>
	);
}

export default ApartmentCard;
