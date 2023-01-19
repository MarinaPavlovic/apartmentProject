import { useState } from "react";
import ErrorModal from "../ui/ErrorModal";
import classes from "./Filter.module.css";

function Filter() {
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [checkedCities, setCheckedCities] = useState({
		cities: [],
	});
	const [checkedCountries, setCheckedCountries] = useState({
		countries: [],
	});
	const [filterPrice, setFilterPrice] = useState({ priceFilter: [] });
	const [error, setError] = useState(false);
	fetch("http://localhost:1313/filter/get/content")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			setCountries(data.countries);
			setCities(data.cities);
		});

	const closeError = () => {
		setError(false);
	};
	const errorHandler = () => {
		setError(true);
	};

	const renderFilterCountry = (country) => {
		return country.map((country, index) => (
			<li>
				<input
					type="checkbox"
					value={country}
					name="country"
					onChange={checkboxHandlerCountry}
				/>
				{country}
			</li>
		));
	};

	const renderFilterCity = (city) => {
		return city.map((city, index) => (
			<li>
				<input
					type="checkbox"
					value={city}
					name="city"
					onChange={checkboxHandlerCities}
				/>
				{city}
			</li>
		));
	};

	const checkboxHandlerCities = (e) => {
		const { value, checked } = e.target;
		const { cities } = checkedCities;
		if (checked) {
			setCheckedCities({
				cities: [...cities, value],
			});
		} else {
			setCheckedCities({
				cities: cities.filter((e) => e !== value),
			});
		}
	};

	const checkboxHandlerCountry = (e) => {
		const { value, checked } = e.target;
		const { countries } = checkedCountries;
		if (checked) {
			setCheckedCountries({
				countries: [...countries, value],
			});
		} else {
			setCheckedCountries({
				countries: countries.filter((e) => e !== value),
			});
		}
	};

	const priceFilderHandler = (e) => {
		const { value, checked } = e.target;
		const { priceFilter } = filterPrice;
		if (checked) {
			setFilterPrice({
				priceFilter: [...priceFilter, value],
			});
		} else {
			setFilterPrice({
				priceFilter: priceFilter.filter((e) => e !== value),
			});
		}
	};

	function submitHandler(e) {
		e.preventDefault();
		console.log(checkedCities, checkedCountries);

		if (filterPrice.lenght > 1) {
			errorHandler();
		}
	}
	return (
		<div className={classes.content}>
			<h2>Filter</h2>
			<form onSubmit={submitHandler}>
				<div className={classes.fiterField}>
					<h4>Country:</h4>
					<ul>{renderFilterCountry(countries)}</ul>
				</div>
				<div className={classes.fiterField}>
					<h4>City:</h4>
					<ul>{renderFilterCity(cities)}</ul>
				</div>
				<div className={classes.fiterField}>
					<h4>Sort by price:</h4>
					<input
						type="checkbox"
						value="upToDown"
						name="upToDown"
						id="upToDown"
						onChange={priceFilderHandler}
					/>
					Cheap
					<br />
					<input
						type="checkbox"
						value="downToUp"
						name="downToUp"
						id="upToDown"
						onChange={priceFilderHandler}
					/>
					Expensiv
				</div>
				<button type="submit">Submit</button>
			</form>
			{error && (
				<ErrorModal
					title="Faild"
					message="You can chose only one type of price sort."
					onCancle={closeError}
				/>
			)}
		</div>
	);
}
export default Filter;
