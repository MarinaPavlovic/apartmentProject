import classes from "./ApartmentEditCard.module.css";
import { useRef, useState } from "react";
import MessageModal from "../ui/MessageModal";
import Backdrop from "./Beckdrop";
import { useHistory } from "react-router-dom";

function ApartmentEditCard(props) {
	const [propsImages, setPropsImages] = useState(props.images);
	const [images, setImages] = useState([]);
	const [name, setName] = useState(props.name);
	const [country, setCountry] = useState(props.country);
	const [city, setCity] = useState(props.city);
	const [adress, setAddress] = useState(props.adres);
	const [description, setDescription] = useState(props.description);
	const [price, setPrice] = useState(props.pricePerNight);
	const [errorCard, setErrorCard] = useState(false);
	const inputImage = useRef();

	const deleteImgHandler = (img) => {
		const imgId = img.id;

		let imageList = [...propsImages];
		imageList = imageList.filter((image) => image.id !== imgId);
		setPropsImages(imageList);
		fetch("http://localhost:1313/apartmentImages/delete/" + imgId);
	};

	const uploadImageHandler = (event) => {
		event.preventDefault();
		let imageList = [...images];
		const enteredImage = inputImage.current.value;
		imageList = [...imageList, enteredImage];
		setImages(imageList);
		console.log(images);
	};
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
				images: images,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status >= 400) {
				setErrorCard(true);
			}
			return res.json();
		});
	};

	function closeError() {
		setErrorCard(false);
	}

	return (
		<div className={classes.item}>
			<h2>Edit Apartment</h2>
			{propsImages.length > 0 && (
				<div className={classes.imageDelete}>
					<ul>
						{propsImages.map((img) => (
							<li key={img.id}>
								<img src={img.imageURL} alt={props.name} />
								<button
									onClick={() => {
										deleteImgHandler(img);
									}}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className={classes.imageDelete}>
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
			<div className={classes.imageDiv}>
				<form onSubmit={uploadImageHandler}>
					<label htmlFor="images">Image URL: </label>
					<input type="url" id="images" required ref={inputImage} />
					<button type="submit">Add Image</button>
				</form>
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
				<MessageModal
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
