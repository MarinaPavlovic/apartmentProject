import classes from "./ApartmentList.module.css";
import ApartmentItem from "./ApartmentItem";
import AuthContext from "../../store/auth-contex";
import { useContext } from "react";
import ApartmentItemHost from "./ApartmentItemHost";
import ApartmentItemFavorite from "./ApartmentItemFavorite";

function ApartmentList(props) {
	const authCtx = useContext(AuthContext);
	const role = authCtx.role;

	let content = props.meetups.map((meetup) => (
		<ApartmentItem
			key={meetup.id}
			id={meetup.id}
			images={meetup.images}
			name={meetup.name}
			adres={meetup.adres}
			description={meetup.description}
			pricePerNight={meetup.pricePerNight}
		/>
	));

	if (role === "HOST") {
		content = props.meetups.map((meetup) => (
			<ApartmentItemHost
				key={meetup.id}
				id={meetup.id}
				images={meetup.images}
				name={meetup.name}
				adres={meetup.adres}
				description={meetup.description}
				pricePerNight={meetup.pricePerNight}
				destinationType={meetup.destinationType}
				userId={meetup.userId}
			/>
		));
	}

	return <ul className={classes.list}>{content}</ul>;
}

export default ApartmentList;
