import ApartmentList from "../components/apartments/ApartmentList";
import { useState, useEffect } from "react";
import Filter from "../components/filter/Filter";
import classes from "./Apartments.module.css";

function ApartmentPage(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [loadedApartments, setLoadedApartments] = useState([]);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [sort, setSort] = useState(0);
	const destinationType = props.destinationType;
	useEffect(() => {
		console.log(cities, countries);
		setIsLoading(true);
		fetch("http://localhost:1313/filter/all", {
			method: "POST",
			body: JSON.stringify({
				countries: countries,
				cities: cities,
				sort: sort,
				destinationType: destinationType,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setIsLoading(false);
				setLoadedApartments(data);
			});
	}, [countries, cities, sort, destinationType]);

	console.log(sort);

	return (
		<>
			{isLoading ? (
				<section>
					<p>Loading...</p>
				</section>
			) : (
				<div className={classes.content}>
					<div className={classes.filter}>
						<Filter
							chosenCountries={countries}
							setChosenCountries={(countries) => setCountries(countries)}
							chosenCities={cities}
							setChosenCities={(cities) => setCities(cities)}
							sort={sort}
							setSort={(sort) => setSort(sort)}
						/>
					</div>
					<div className={classes.apartments}>
						<ApartmentList apartments={loadedApartments} />
					</div>
				</div>
			)}
		</>
	);
}

export default ApartmentPage;
