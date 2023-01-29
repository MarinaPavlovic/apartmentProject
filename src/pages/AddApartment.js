import { useRef, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import classes from "./AddApartment.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MessageModal from "../components/ui/MessageModal";
import Backdrop from "../components/apartments/Beckdrop";

function AddApartmentPage() {
	const authCtx = useContext(AuthContext);
	const inputName = useRef();
	const inputDescription = useRef();
	const inputCountry = useRef();
	const inputCity = useRef();
	const inputAddress = useRef();
	const inputPrice = useRef();
	const inputImage = useRef();
	const [destination, setDestination] = useState(undefined);
	const [errorCard, setErrorCard] = useState(false);
	const [images, setImages] = useState([]);
	const [message, setMessage] = useState(false);

	function closeError() {
		setErrorCard(false);
	}
	function closeMessage() {
		setMessage(false);
	}

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredName = inputName.current.value;
		const enteredDescription = inputDescription.current.value;
		const enteredCountry = inputCity.current.value;
		const enteredCity = inputCity.current.value;
		const enteredAddress = inputAddress.current.value;
		const enteredPrice = parseInt(inputPrice.current.value);

		if (images.length !== 0) {
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
					destinationType: destination,
					images: images,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status >= 400) {
					setErrorCard(true);
				} else {
					setMessage(true);
				}
			});
		} else {
			setErrorCard(true);
		}
	};

	const uploadImageHandler = (event) => {
		event.preventDefault();
		let imageList = [...images];
		const enteredImage = inputImage.current.value;
		imageList = [...imageList, enteredImage];
		setImages(imageList);
		console.log(images);
	};

	return (
		<div className={classes.card}>
			<div className={classes.content}>
				<div className={classes.imageDiv}>
					{images.length > 0 && (
						<ul>
							{images.map((img) => (
								<>
									<li>
										<img src={img} alt="can't load" />
										<button
											onClick={() => {
												let imageList = [...images];
												imageList = imageList.filter((image) => image !== img);
												setImages(imageList);
											}}
										>
											Delete
										</button>
									</li>
								</>
							))}
						</ul>
					)}
				</div>

				<form onSubmit={uploadImageHandler}>
					<label htmlFor="images">Image URL: </label>
					<input type="url" id="images" required ref={inputImage} />
					<button type="submit">Add Image</button>
				</form>

				<form onSubmit={submitHandler}>
					<label htmlFor="name">Apartment Name: </label>
					<input type="text" id="name" required ref={inputName} />
					<br />
					<label htmlFor="description">Description:</label>
					<input
						type="textarea"
						id="description"
						required
						ref={inputDescription}
					/>
					<br />
					<label htmlFor="country">Country:</label>
					<input type="text" id="country" required ref={inputCountry} />
					<br />
					<label htmlFor="city">City:</label>
					<input type="text" id="city" required ref={inputCity} />
					<br />
					<label htmlFor="address">Address:</label>
					<input type="text" id="adress" required ref={inputAddress} />
					<br />
					<label htmlFor="price">Price per night:</label>
					<input type="text" id="price" required ref={inputPrice} />
					<br />
					<label htmlFor="destType">Destination Type:</label>
					<br />
					<input
						type="radio"
						name="destination"
						id="destType1"
						value="BEACH"
						onChange={(e) => setDestination(e.target.value)}
					/>{" "}
					Apartment on beach
					<br />
					<input
						type="radio"
						name="destination"
						id="destType2"
						value="CITIES"
						onChange={(e) => setDestination(e.target.value)}
					/>{" "}
					Apartment in city
					<br />
					<input
						type="radio"
						name="destination"
						id="destType3"
						value="SKIING"
						onChange={(e) => setDestination(e.target.value)}
					/>{" "}
					Apartment on mountin
					<br />
					<br />
					<button>Add Apartment</button>
				</form>
			</div>
			{errorCard && (
				<MessageModal
					title="Faild to create new apartment"
					message="Check if the input values is correct."
					onCancle={closeError}
				/>
			)}
			{errorCard && <Backdrop onCancle={closeError} />}
			{message && (
				<MessageModal
					title="Add Apartment"
					message="You add new apartment."
					onCancle={closeMessage}
				/>
			)}
			{message && <Backdrop onCancle={closeMessage} />}
		</div>
	);
}

export default AddApartmentPage;
