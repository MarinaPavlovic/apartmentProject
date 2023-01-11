import classes from "./ApartmentCard.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-contex";

function ApartmentCard(props) {
	const authCtx = useContext(AuthContext);

	const [imageNum, setImageNum] = useState(0);

	function toFavorite() {
		const apartmentId = props.id;
		const userId = authCtx.id;

		fetch("http://localhost:1313/favorite/add/favorite", {
			method: "POST",
			body: JSON.stringify({
				apartmentId: apartmentId,
				userId: userId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
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
				<address>{props.adres}</address>
				<p>{props.description}</p>
				<p>
					<b>{props.pricePerNight}$</b>
				</p>
			</div>

			<div className={classes.avDays}>
				<h3>You want to visit us?</h3>
				<p>Check available days:</p>
				<ul>
					<li>
						<h4>Starting day:</h4>
						<input type="datetime-local" />
					</li>
					<li>
						<h4>End day:</h4>
						<input type="datetime-local" />
					</li>
					<li>
						<button>Check</button>
					</li>
				</ul>
			</div>

			<div className={classes.actions}>
				<button onClick={toFavorite}>To Favorites</button>
			</div>
			<div className={classes.actions}>
				<button onClick={props.onCancle}>Close</button>
			</div>
		</div>
	);
}

export default ApartmentCard;