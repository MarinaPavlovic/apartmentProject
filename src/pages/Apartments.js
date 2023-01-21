import ApartmentList from "../components/apartments/ApartmentList";
import { useState, useEffect } from "react";
import Filter from "../components/filter/Filter";

function ApartmentPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [loadedMeetups, setLoadedMeetups] = useState([]);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [sort, setSort] = useState("DEFAULT");

	useEffect(() => {
		console.log(cities, countries);
		setIsLoading(true);
		fetch("http://localhost:1313/apartment/get/all")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setIsLoading(false);
				setLoadedMeetups(data);
			});
	}, [countries, cities, sort]);

	return (
		<>
			{isLoading ? (
				<section>
					<p>Loading...</p>
				</section>
			) : (
				<div className="">
					<Filter
						chosenCountries={countries}
						setChosenCountries={(countries) => setCountries(countries)}
						chosenCities={cities}
						setChosenCities={(cities) => setCities(cities)}
						sort={sort}
						setSort={(sort) => setSort(sort)}
					/>
					<ApartmentList meetups={loadedMeetups} />
				</div>
			)}
		</>
	);
}

export default ApartmentPage;
