import { useContext, useState } from "react";
import AuthContext from "../store/auth-contex";
import ApartmentList from "../components/apartments/ApartmentList";

function MyFavoritePage() {
	const authCtx = useContext(AuthContext);
	const userId = parseInt(authCtx.id);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedApartments, setLoadedApartments] = useState([]);

	fetch("http://localhost:1313/favorite/get/favorites/" + userId)
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
			setIsLoading(false);
			setLoadedApartments(apartments);
		});

	if (isLoading) {
		return (
			<section>
				<p>Loading...</p>
			</section>
		);
	}

	return (
		<section>
			{loadedApartments.length === 0 ? (
				<p>You don't have favorite apartments yet.</p>
			) : (
				<ApartmentList meetups={loadedApartments} />
			)}
		</section>
	);
}

export default MyFavoritePage;
