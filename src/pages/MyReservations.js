import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import classes from "./MyProfile.module.css";
import ReservApartments from "../components/apartments/ReservApartments";

function MyReservationsPage() {
	const authCtx = useContext(AuthContext);
	const userId = authCtx.id;
	const token = authCtx.token;
	const [loadedResApartments, setLoadedResApartments] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/reservations/user/" + userId, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const apartments = [];

				for (const key in data) {
					const apartment = {
						id: key,
						...data[key],
					};

					apartments.push(apartment);
				}
				setLoadedResApartments(apartments);
			});
	}, [userId, token]);

	return (
		<ul>
			<li className={classes.reservations}>
				<h2>My reservations:</h2>
				{loadedResApartments.length === 0 ? (
					<p>You don't have reservations yet.</p>
				) : (
					loadedResApartments.map((apartment) => (
						<ReservApartments
							key={apartment.key}
							images={apartment.images}
							startDay={apartment.startDay}
							endDay={apartment.endDay}
							name={apartment.name}
						/>
					))
				)}
			</li>
		</ul>
	);
}
export default MyReservationsPage;
