import classes from "./ApartmentEditCard.module.css";
import { useState } from "react";
import ErrorModal from "../ui/ErrorModal";
import Backdrop from "./Beckdrop";
import { useHistory } from "react-router-dom";

function ApartmentEditCard(props) {
	const [imageid, setImageId] = useState(0);
	const [inputImage, setInputImage] = useState("");
	const [name, setName] = useState(props.name);
	const [country, setCountry] = useState(props.country);
	const [city, setCity] = useState(props.city);
	const [adress, setAddress] = useState(props.adres);
	const [description, setDescription] = useState(props.description);
	const [price, setPrice] = useState(props.pricePerNight);
	const [errorCard, setErrorCard] = useState(false);
	const history = useHistory();

	var uploadImages = [];
	const deleteImgHandler = () => {
		fetch("http://localhost:1313/apartmentImages/delete/" + imageid);
	};

	const imageList = [];
	function uploadImageHandler(event) {
		event.preventDefault();

		if (inputImage !== "") {
			imageList.push(inputImage);
			uploadImages.push(inputImage);
		}
		return imageList;
	}
	const editHandler = () => {
		fetch("http://localhost:1313/apartment/edit", {
			method: "POST",
			body: JSON.stringify({
				id: props.id,
				userId: props.userId,
				name: name,
				description: description,
				country: country,
				city: city,
				adres: adress,
				pricePerNight: price,
				destinationType: props.destinationType,
				images: imageList,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status >= 400) {
				setErrorCard(true);
			} else {
				history.push("/myApartments");
			}
		});
	};

	function closeError() {
		setErrorCard(false);
	}
	return (
		<div className={classes.item}>
			<h2>Edit Apartment</h2>
			{props.images.length > 0 && (
				<div className={classes.imageDelete}>
					<ul>
						{props.images.map((img) => (
							<li>
								<img src={img.imageURL} alt={props.name} />
								<button
									onClick={() => {
										setImageId(img.id);
										deleteImgHandler();
									}}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			)}

			<div className={classes.imageDiv}>
				<label htmlFor="images">Image URL:</label>
				<input
					type="url"
					id="images"
					required
					onChange={(e) => setInputImage(e.target.value)}
				/>
				<button onClick={uploadImageHandler}>Add Image</button>
				<p>You add {imageList.length} image.</p>
			</div>
			<div className={classes.content}>
				<div>
					<h6>
						<b>Name:</b>
					</h6>
					<input
						placeholder={props.name}
						type="text"
						id="name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<h6>
						<b>Country:</b>
					</h6>
					<input
						placeholder={props.country}
						type="text"
						id="country"
						onChange={(e) => setCountry(e.target.value)}
					/>
				</div>
				<div>
					<h6>
						<b>City:</b>
					</h6>
					<input
						placeholder={props.city}
						type="text"
						id="city"
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>

				<div>
					<h6>
						<b>Address:</b>
					</h6>
					<input
						placeholder={props.adres}
						type="text"
						id="address"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>

				<div>
					<h6>
						<b>Description:</b>
					</h6>
					<textarea
						cols="50"
						rows="10"
						placeholder={props.description}
						type="textbox"
						id="description"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div>
					<h6>
						<b>Price:</b>
					</h6>
					<input
						placeholder={props.pricePerNight}
						type="text"
						id="price"
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>

				<button onClick={editHandler}>Apply Changes</button>
			</div>
			<div className={classes.actions}>
				<button onClick={props.onCancle}>Close</button>
			</div>

			{errorCard && (
				<ErrorModal
					title="Edit faild"
					message="Something went wrong, check input values."
					onCancle={closeError}
				/>
			)}
			{errorCard && <Backdrop onCancle={closeError} />}
		</div>
	);
}

export default ApartmentEditCard;
