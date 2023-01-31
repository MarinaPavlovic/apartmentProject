import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import classes from "./MyProfile.module.css";
import ReservApartments from "../components/apartments/ReservApartments";
import MessageModal from "../components/ui/MessageModal";
import Backdrop from "../components/apartments/Beckdrop";
import { useHistory } from "react-router-dom";
import DeleteCard from "../components/ui/DeleteCard";

function MyProfilePage() {
	const authCtx = useContext(AuthContext);
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userId = authCtx.id;
	const token = authCtx.token;
	const [loadedResApartments, setLoadedResApartments] = useState([]);
	const [edit, setEdit] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(false);
	const [deleteCard, setDeleteCard] = useState(false);
	const history = useHistory();

	useEffect(() => {
		fetch("http://localhost:8080/user/" + userId, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setFullName(data.fullName);
				setUsername(data.username);
				setEmail(data.email);
			});
	}, [userId, token]);

	useEffect(() => {
		fetch("http://localhost:8080/reservations/user/" + userId, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
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
				setLoadedResApartments(apartments);
			});
	}, [userId, token]);

	const editStateHandler = (e) => {
		e.preventDefault();
		setEdit(true);
	};

	const editSubmitHandler = (e) => {
		e.preventDefault();
		fetch("http://localhost:8080/user/" + userId, {
			method: "PATCH",
			body: JSON.stringify({
				fullName: fullName,
				username: username,
				password: password,
				email: email,
			}),
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status >= 400) {
					setError(true);
				} else {
					setMessage(true);
				}
				return res.json();
			})
			.then((data) => {
				authCtx.logout();
				history.push("/");
			});
	};

	function closeError() {
		setError(false);
	}
	function closeMessage() {
		setMessage(false);
	}
	function closeDeleteCard() {
		setDeleteCard(false);
	}

	function deleteUser() {
		fetch("http://localhost:8080/user/" + userId, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((res) => {
			if (res.status < 400) {
				setDeleteCard(false);
				history.push("/");
				authCtx.logout();
			}
		});
	}
	return (
		<div className={classes.content}>
			<ul>
				<li className={classes.user}>
					{!edit && (
						<>
							<h2>{username}</h2>
							<h2>{fullName}</h2>
							<p>{email}</p>
							<button onClick={editStateHandler}>Edit</button>
							<button
								onClick={() => {
									setDeleteCard(true);
								}}
							>
								Delete
							</button>
						</>
					)}
					{edit && (
						<form onSubmit={editSubmitHandler}>
							<h2>Full name:</h2>
							<input
								type="text"
								id="fullName"
								placeholder={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
							<h2>Email:</h2>
							<input
								type="email"
								id="email"
								placeholder={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<h2>Username:</h2>
							<input
								type="text"
								id="username"
								placeholder={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<h2>Password:</h2>
							<input
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button type="submit">Edit</button>
							<button
								onClick={() => {
									setEdit(false);
								}}
							>
								Cancle
							</button>
						</form>
					)}
				</li>
				<li className={classes.reservations}>
					<h2>My reservations:</h2>
					{loadedResApartments.length === 0 ? (
						<p>You don't have reservations yet.</p>
					) : (
						loadedResApartments.map((apartment) => (
							<ReservApartments
								key={apartment.key}
								images={apartment.images}
								startDay={apartment.startDay}
								endDay={apartment.endDay}
								name={apartment.name}
								userId={apartment.userUserId}
								hostId={apartment.userHostId}
								totalDays={apartment.totalDays}
								totalPrice={apartment.totalPrice}
								country={apartment.country}
								city={apartment.city}
								address={apartment.adres}
								reservationId={apartment.reservationId}
								apartmentId={apartment.apartmentId}
								loadedReservations={loadedResApartments}
								setLoadedReservations={(changedList) =>
									setLoadedResApartments(changedList)
								}
							/>
						))
					)}
				</li>
			</ul>
			{error && (
				<MessageModal
					title="Something went wrong"
					message="Check the date you enter, have on mind that username must be unique."
					onCancle={closeError}
				/>
			)}
			{error && <Backdrop onCancle={closeError} />}
			{message && (
				<MessageModal
					title="Edit"
					message="You edit your datas so you need to log in again."
					onCancle={closeMessage}
				/>
			)}
			{message && <Backdrop onCancle={closeMessage} />}
			{deleteCard && (
				<DeleteCard
					title="Delete"
					message="Are you sure you want to delete your account?."
					onCancle={closeDeleteCard}
					onDelete={deleteUser}
				/>
			)}
			{deleteCard && <Backdrop onCancle={closeDeleteCard} />}
		</div>
	);
}

export default MyProfilePage;
