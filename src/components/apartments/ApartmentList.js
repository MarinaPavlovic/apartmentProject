import classes from "./ApartmentList.module.css";
import ApartmentItem from "./ApartmentItem";
import AuthContext from "../../store/auth-contex";
import { useContext } from "react";
import ApartmentItemHost from "./ApartmentItemHost";

function ApartmentList(props) {
	const authCtx = useContext(AuthContext);
	const role = authCtx.role;

	let content = props.apartments.map((apartment) => (
		<ApartmentItem
			key={apartment.id}
			id={apartment.id}
			userId={apartment.userId}
			images={apartment.images}
			name={apartment.name}
			country={apartment.country}
			city={apartment.city}
			adres={apartment.adres}
			description={apartment.description}
			pricePerNight={apartment.pricePerNight}
		/>
	));

	if (role === "HOST") {
		content = props.apartments.map((apartment) => (
			<ApartmentItemHost
				key={apartment.id}
				id={apartment.id}
				images={apartment.images}
				name={apartment.name}
				country={apartment.country}
				city={apartment.city}
				adres={apartment.adres}
				description={apartment.description}
				pricePerNight={apartment.pricePerNight}
				destinationType={apartment.destinationType}
				userId={apartment.userId}
			/>
		));
	}

	return <ul className={classes.list}>{content}</ul>;
}

export default ApartmentList;
