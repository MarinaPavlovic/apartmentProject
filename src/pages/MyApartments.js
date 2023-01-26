import AuthContext from "../store/auth-contex";
import { useContext, useState } from "react";
import ApartmentList from "../components/apartments/ApartmentList";
import { useEffect } from "react";

function MyApartmentPage() {
	const [loadedApartments, setLoadedApartments] = useState([]);
	const authCtx = useContext(AuthContext);
	const hostid = authCtx.id;
	const [reload, setReload] = useState(true);

	useEffect(() => {
		if (reload) {
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
			setReload(false);
		}
	}, [hostid, reload]);

	return (
		<section>
			{loadedApartments.length === 0 ? (
				<p>You don't have apartments yet.</p>
			) : (
				<ApartmentList apartments={loadedApartments} />
			)}
		</section>
	);
}

export default MyApartmentPage;
