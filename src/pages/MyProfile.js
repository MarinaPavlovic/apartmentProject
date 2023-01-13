import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import classes from "./MyProfile.module.css";
import ApartmentItemFavorite from "../components/apartments/ApartmentItemFavorite";

function MyProfilePage() {
	const authCtx = useContext(AuthContext);
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const userId = authCtx.id;
	const token = authCtx.token;
	const [loadedResApartments, setLoadedResApartments] = useState([]);

	fetch("http://localhost:8080/user/" + userId, {
		headers: {
			Authorization: "Bearer " + token,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setFullName(data.fullName);
			setUsername(data.username);
			setEmail(data.email);
		});

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
				<li className={classes.user}>
					<h2>{username}</h2>
					<h2>{fullName}</h2>
					<h4>{email}</h4>
					<button>Edit</button>
				</li>
				<li className={classes.reservations}>
					<h2>My reservations:</h2>
					{loadedResApartments.length === 0 ? (
						<p>You don't have reservations yet.</p>
					) : (
						loadedResApartments.map((apartment) => <h2>{apartment.id}</h2>)
					)}
				</li>
			</ul>
		</div>
	);
}

export default MyProfilePage;
