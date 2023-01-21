import { useEffect, useState } from "react";
import ErrorModal from "../ui/ErrorModal";
import classes from "./Filter.module.css";

function Filter(props) {
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	const {
		chosenCountries,
		setChosenCountries,
		chosenCities,
		setChosenCities,
		sort,
		setSort,
	} = props;

	useEffect(() => {
		fetch("http://localhost:1313/filter/get/content")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCountries(data.countries);
				setCities(data.cities);
			});
	}, []);

	const renderFilterCountry = () => {
		return countries.map((country, index) => (
			<li key={index}>
				<input
					type="checkbox"
					value={country}
					name="country"
					checked={chosenCountries.includes(country)}
					onChange={checkboxHandlerCountry}
				/>
				{country}
			</li>
		));
	};

	const renderFilterCity = () => {
		return cities.map((city, index) => (
			<li key={index}>
				<input
					type="checkbox"
					value={city}
					name="city"
					checked={chosenCities.includes(city)}
					onChange={checkboxHandlerCities}
				/>
				{city}
			</li>
		));
	};

	const checkboxHandlerCities = (e) => {
		const { value, checked } = e.target;
		let newChosenCities = [...chosenCities];
		if (checked) {
			newChosenCities = [...newChosenCities, value];
		} else {
			newChosenCities = newChosenCities.filter((city) => city !== value);
		}
		setChosenCities(newChosenCities);
	};

	const checkboxHandlerCountry = (e) => {
		const { value, checked } = e.target;
		let newChosenCountries = [...chosenCountries];
		if (checked) {
			newChosenCountries = [...newChosenCountries, value];
		} else {
			newChosenCountries = newChosenCountries.filter(
				(country) => country !== value
			);
		}
		setChosenCountries(newChosenCountries);
	};

	return (
		<div className={classes.content}>
			<h2>Filter</h2>
			<div className={classes.fiterField}>
				<h4>Country:</h4>
				<ul>{renderFilterCountry()}</ul>
			</div>
			<div className={classes.fiterField}>
				<h4>City:</h4>
				<ul>{renderFilterCity()}</ul>
			</div>
			{/* <div className={classes.fiterField}>
				<h4>Sort by price:</h4>
				<input
					type="checkbox"
					value="downToUp"
					name="downToUp"
					id="downToUp"
					onChange={priceFilderHandler}
				/>
				Cheap
				<br />
				<input
					type="checkbox"
					value="upToDown"
					name="upToDown"
					id="upToDown"
					onChange={priceFilderHandler}
				/>
				Expensiv
			</div>
			<div className={classes.fiterField}>
				<h4>You want to see most popular apartments?</h4>
				<input
					type="checkbox"
					value="mostPopular"
					name="mostPopular"
					id="mostPopular"
				/>
				Most popular
			</div> */}
		</div>
	);
}
export default Filter;
