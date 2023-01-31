import { useContext, useState } from "react";
import AuthContext from "../store/auth-contex";
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
				setIsLoading(false);
				setLoadedApartments(data);
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
						userId={apartment.userId}
						images={apartment.images}
						name={apartment.name}
						country={apartment.country}
						city={apartment.city}
						adres={apartment.adres}
						description={apartment.description}
						pricePerNight={apartment.pricePerNight}
						loadedUser={userId}
						loadedApartments={loadedApartments}
						setLoadedApartments={(apartments) =>
							setLoadedApartments(apartments)
						}
					/>
				))
			)}
		</section>
	);
}

export default MyFavoritePage;
