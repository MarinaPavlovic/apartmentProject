import { useRef, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import classes from "./AddApartment.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ErrorModal from "../components/ui/ErrorModal";
import Backdrop from "../components/apartments/Beckdrop";

function AddApartmentPage() {
	const authCtx = useContext(AuthContext);
	const inputName = useRef();
	const inputDescription = useRef();
	const inputCountry = useRef();
	const inputCity = useRef();
	const inputAddress = useRef();
	const inputPrice = useRef();
	const inputDestType = useRef();
	const inputImage = useRef();
	const [errorCard, setErrorCard] = useState(false);

	function closeError() {
		setErrorCard(false);
	}

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredName = inputName.current.value;
		const enteredDescription = inputDescription.current.value;
		const enteredCountry = inputCity.current.value;
		const enteredCity = inputCity.current.value;
		const enteredAddress = inputAddress.current.value;
		const enteredPrice = parseInt(inputPrice.current.value);
		const enteredDestType = inputDestType.current.value;

		if (imageList.length !== 0) {
			fetch("http://localhost:1313/apartment/create", {
				method: "POST",
				body: JSON.stringify({
					userId: authCtx.id,
					name: enteredName,
					description: enteredDescription,
					country: enteredCountry,
					city: enteredCity,
					adres: enteredAddress,
					pricePerNight: enteredPrice,
					destinationType: enteredDestType,
					images: imageList,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status >= 400) {
					setErrorCard(true);
				}
			});
		} else {
			setErrorCard(true);
		}
	};

	const imageList = [];

	function uploadImageHandler(event) {
		event.preventDefault();
		const enteredImage = inputImage.current.value;

		if (enteredImage !== "") {
			imageList.push(enteredImage);
		}
		return imageList;
	}

	var imageCounter = imageList.length;

	return (
		<div className={classes.card}>
			<h2>Add new apartment</h2>

			<div className={classes.imageDiv}>
				<form onSubmit={uploadImageHandler}>
					<label htmlFor="images">Image URL:</label>
					<input type="url" id="images" required ref={inputImage} />
					<button>Add Image</button>
					<p>You add {imageCounter} image.</p>
				</form>
			</div>

			<form onSubmit={submitHandler}>
				<table>
					<tr>
						<th>
							<label htmlFor="name">Apartment Name:</label>
						</th>
						<td>
							<input type="text" id="name" required ref={inputName} />
						</td>
					</tr>
					<tr>
						<th>
							<label htmlFor="description">Description:</label>
						</th>
						<td>
							<input
								type="textarea"
								id="description"
								required
								ref={inputDescription}
							/>
						</td>
					</tr>
					<tr>
						<th>
							<label htmlFor="country">Country:</label>
						</th>
						<td>
							<input type="text" id="country" required ref={inputCountry} />
						</td>
					</tr>
					<tr>
						<th>
							<label htmlFor="city">City:</label>
						</th>
						<td>
							<input type="text" id="city" required ref={inputCity} />
						</td>
					</tr>
					<tr>
						<th>
							<label htmlFor="address">Address:</label>
						</th>
						<td>
							<input type="text" id="adress" required ref={inputAddress} />
						</td>
					</tr>

					<tr>
						<th>
							<label htmlFor="price">Price per night:</label>
						</th>
						<td>
							<input type="text" id="price" required ref={inputPrice} />
						</td>
					</tr>
					<tr>
						<th>
							<label htmlFor="destType">Destination Type:</label>
						</th>
						<td>
							<input type="text" id="destType" required ref={inputDestType} />
						</td>
					</tr>
				</table>

				<button>Add Apartment</button>
			</form>
			{errorCard && (
				<ErrorModal
					title="Faild to create new apartment"
					message="Check if the input values is correct."
					onCancle={closeError}
				/>
			)}
			{errorCard && <Backdrop onCancle={closeError} />}
		</div>
	);
}

export default AddApartmentPage;
