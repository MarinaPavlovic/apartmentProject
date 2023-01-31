import AuthContext from "../store/auth-contex";
import { useContext, useState } from "react";
import ApartmentList from "../components/apartments/ApartmentList";
import { useEffect } from "react";

function MyApartmentPage() {
	const [loadedApartments, setLoadedApartments] = useState([]);
	const authCtx = useContext(AuthContext);
	const hostid = authCtx.id;

	useEffect(() => {
		fetch("http://localhost:1313/apartment/get/host/apartments/" + hostid)
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

				setLoadedApartments(apartments);
			});
	}, [hostid]);

	return (
		<section>
			{loadedApartments.length === 0 ? (
				<p>You don't have apartments yet.</p>
			) : (
				<ApartmentList
					apartments={loadedApartments}
					setLoadedApartments={(apartments) => setLoadedApartments(apartments)}
				/>
			)}
		</section>
	);
}

export default MyApartmentPage;
