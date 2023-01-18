import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import ReservApartments from "../components/apartments/ReservApartments";
import classes from "./MyReservations.module.css";

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
		<div className={classes.content}>
			<ul>
				<li className={classes.reservations}>
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
								userId={apartment.userUserId}
								hostId={apartment.userHostId}
							/>
						))
					)}
				</li>
			</ul>
		</div>
	);
}
export default MyReservationsPage;
