import AuthContext from "../store/auth-contex";
import { useContext, useState } from "react";
import ApartmentList from "../components/apartments/ApartmentList";
import { useEffect } from "react";

function MyApartmentPage() {
	const [loadedMeetups, setLoadedMeetups] = useState([]);
	const authCtx = useContext(AuthContext);
	const hostid = authCtx.id;

	useEffect(() => {
		fetch("http://localhost:1313/apartment/get/host/apartments/" + hostid)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const meetups = [];

				for (const key in data) {
					const meetup = {
						id: key,
						...data[key],
					};

					meetups.push(meetup);
				}

				setLoadedMeetups(meetups);
			});
	}, [hostid]);

	return (
		<section>
			{loadedMeetups.length === 0 ? (
				<p>You don't have apartments yet.</p>
			) : (
				<ApartmentList meetups={loadedMeetups} />
			)}
		</section>
	);
}

export default MyApartmentPage;
