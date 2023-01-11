import classes from "./ApartmentItem.module.css";
import Card from "../ui/Card";
import { useContext, useState } from "react";
import ApartmentCard from "./ApartmentCard";
import Backdrop from "./Beckdrop";
import AuthContext from "../../store/auth-contex";

function ApartmentItemFavorite(props) {
	const [imageNum, setImageNum] = useState(0);

	const [cardIsOpen, setCardIsOpen] = useState(false);
	function moreHandler() {
		setCardIsOpen(true);
	}
	function closeCard() {
		setCardIsOpen(false);
	}

	function deleteHandler() {
		const apartmentId = props.id;

		fetch("http://localhost:1313/favorite/" + apartmentId, {
			method: "DELETE",
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
					<address>{props.adres}</address>
					<p>
						<b>{props.pricePerNight}$</b>
					</p>
				</div>

				<div>
					<div className={classes.actions}>
						<button onClick={moreHandler}>More</button>
					</div>
					<div className={classes.actions}>
						<button onClick={deleteHandler}>Delete</button>
					</div>
				</div>
			</Card>
			{cardIsOpen && (
				<ApartmentCard
					name={props.name}
					images={props.images}
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

export default ApartmentItemFavorite;
