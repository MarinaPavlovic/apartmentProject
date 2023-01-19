import ApartmentList from "../components/apartments/ApartmentList";
import { useState, useEffect } from "react";
import Filter from "../components/filter/Filter";
import Backdrop from "../components/apartments/Beckdrop";

function ApartmentPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedMeetups, setLoadedMeetups] = useState([]);
	const [filter, setFilter] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch("http://localhost:1313/apartment/get/all")
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
				setIsLoading(false);
				setLoadedMeetups(meetups);
			});
	}, []);

	function filterHandler() {
		setFilter(true);
	}
	function closeFilter() {
		setFilter(false);
	}

	if (isLoading) {
		return (
			<section>
				<p>Loading...</p>
			</section>
		);
	}

	return (
		<div>
			<div>
				<button onClick={filterHandler}>Filter</button>
			</div>

			<section>
				<ApartmentList meetups={loadedMeetups} />
			</section>
			{filter && <Filter />}
			{filter && <Backdrop onCancle={closeFilter} />}
		</div>
	);
}

export default ApartmentPage;
