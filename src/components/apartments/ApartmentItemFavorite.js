import classes from "./ApartmentItem.module.css";
import Card from "../ui/Card";
import { useState } from "react";
import ApartmentCard from "./ApartmentCard";
import Backdrop from "./Beckdrop";

function ApartmentItemFavorite(props) {
	const [imageNum, setImageNum] = useState(0);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const loadedApartments = props.loadedApartments;
	const setLoadedApartments = props.setLoadedApartments;

	function moreHandler() {
		setCardIsOpen(true);
	}
	function closeCard() {
		setCardIsOpen(false);
	}

	function deleteHandler() {
		const apartmentId = props.id;
		const logUserId = props.loadedUser;

		fetch("http://localhost:1313/favorite/delete", {
			method: "POST",
			body: JSON.stringify({
				userId: logUserId,
				apartmentId: apartmentId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.ok) {
			} else {
				console.error("ERROR");
			}
		});

		let favoriteApartments = [...loadedApartments];
		favoriteApartments = favoriteApartments.filter(
			(apartment) => apartment.id !== apartmentId
		);
		setLoadedApartments(favoriteApartments);
	}

	return (
		<li className={classes.item} key={props.apartmentId}>
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
						<button onClick={deleteHandler}>Delete</button>
					</div>
				</div>
			</Card>
			{cardIsOpen && (
				<ApartmentCard
					apartmentId={props.id}
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

export default ApartmentItemFavorite;
