import classes from "./ApartmentItem.module.css";
import Card from "../ui/Card";
import { useContext, useState } from "react";
import ApartmentCard from "./ApartmentCard";
import Backdrop from "./Beckdrop";
import AuthContext from "../../store/auth-contex";

function ApartmentItem(props) {
	const authCtx = useContext(AuthContext);
	const [imageNum, setImageNum] = useState(0);

	const [cardIsOpen, setCardIsOpen] = useState(false);
	function moreHandler() {
		setCardIsOpen(true);
	}
	function closeCard() {
		setCardIsOpen(false);
	}

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
		<li className={classes.item}>
			<Card>
				{props.images.length > 0 && (
					<div className={classes.image}>
						{imageNum !== 0 && (
							<button onClick={(e) => setImageNum(imageNum - 1)}>&lt;</button>
						)}
						<img src={props.images[imageNum].imageURL} alt={props.name} />
						{imageNum !== props.images.length - 1 && (
							<button onClick={(e) => setImageNum(imageNum + 1)}>&gt;</button>
						)}
					</div>
				)}
				<div className={classes.content}>
					<p>
						<b>{props.name}</b>
					</p>
					<address>
						{props.adres + ", " + props.city + ", " + props.country}
					</address>
					<p>
						<b>{props.pricePerNight}$</b>
					</p>
				</div>

				<div>
					<div className={classes.actions}>
						<button onClick={moreHandler}>More</button>
					</div>
					<div className={classes.actions}>
						<button onClick={toFavorite}>To Favorites</button>
					</div>
				</div>
			</Card>
			{cardIsOpen && (
				<ApartmentCard
					id={props.id}
					userId={props.userId}
					name={props.name}
					images={props.images}
					country={props.country}
					city={props.city}
					adres={props.adres}
					description={props.description}
					pricePerNight={props.pricePerNight}
					onCancle={closeCard}
				/>
			)}
			{cardIsOpen && <Backdrop onCancle={closeCard} />}
		</li>
	);
}

export default ApartmentItem;
