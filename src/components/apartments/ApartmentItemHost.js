import classes from "./ApartmentItem.module.css";
import Card from "../ui/Card";
import { useState } from "react";
import ApartmentEditCard from "./ApartmentEditCard";
import Backdrop from "./Beckdrop";
function ApartmentItemHost(props) {
	const [imageNum, setImageNum] = useState(0);

	const [cardIsOpen, setCardIsOpen] = useState(false);
	function moreHandler() {
		setCardIsOpen(true);
	}
	function closeCard() {
		setCardIsOpen(false);
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

				<div className={classes.actions}>
					<button onClick={moreHandler}>Edit</button>
				</div>
			</Card>
			{cardIsOpen && (
				<ApartmentEditCard
					id={props.id}
					name={props.name}
					images={props.images}
					country={props.country}
					city={props.city}
					adres={props.adres}
					description={props.description}
					pricePerNight={props.pricePerNight}
					destinationType={props.destinationType}
					userId={props.userId}
					onCancle={closeCard}
				/>
			)}
			{cardIsOpen && <Backdrop onCancle={closeCard} />}
		</li>
	);
}

export default ApartmentItemHost;
