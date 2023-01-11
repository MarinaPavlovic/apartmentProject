import { useContext, useState } from "react";
import AuthContext from "../store/auth-contex";
import ApartmentList from "../components/apartments/ApartmentList";
import { useEffect } from "react";
import ApartmentItemFavorite from "../components/apartments/ApartmentItemFavorite";

function MyFavoritePage() {
	const authCtx = useContext(AuthContext);
	const userId = parseInt(authCtx.id);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedApartments, setLoadedApartments] = useState([]);

	useEffect(() => {
		setIsLoading(true);
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
	}, [userId]);

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
				loadedApartments.map((apartment) => (
					<ApartmentItemFavorite
						key={apartment.id}
						id={apartment.id}
						images={apartment.images}
						name={apartment.name}
						adres={apartment.adres}
						description={apartment.description}
						pricePerNight={apartment.pricePerNight}
					/>
				))
			)}
		</section>
	);
}

export default MyFavoritePage;
