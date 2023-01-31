import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-contex";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";

function ReservationCalendar(props) {
	const user = useContext(AuthContext);
	const [reservations, setReservations] = useState([]);

	const { apartmentId, startDay, setStartDay, endDay, setEndDay } = props;

	useEffect(() => {
		fetch("http://localhost:8080/reservations/all/" + apartmentId, {
			headers: {
				Authorization: "Bearer " + user.token,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const reservations = [];
				for (const key in data) {
					const reservation = {
						id: key,
						...data[key],
					};

					reservations.push(reservation);
				}

				setReservations(reservations);
			});
	}, [apartmentId, user.token]);

	function disabledDays() {
		const dates = [];
		const apmReservations = [...reservations];

		console.log(reservations);
		for (let i = 0; i < apmReservations.length; i++) {
			const startDay = new Date(apmReservations[i].startDay);
			const endDay = new Date(apmReservations[i].endDay);
			const newDates = {
				start: subDays(new Date(startDay), 1),
				end: addDays(endDay, 0),
			};

			dates.push(newDates);
		}
		return dates;
	}
	return (
		<div>
			<ul>
				<li>
					<h4>Starting Day:</h4>
					<DatePicker
						selected={startDay}
						onChange={(date) => setStartDay(date)}
						minDate={new Date()}
						excludeDateIntervals={disabledDays()}
					/>
				</li>
				<li>
					<h4>End Day:</h4>

					<DatePicker
						selected={endDay}
						onChange={(date) => setEndDay(date)}
						minDate={new Date()}
						excludeDateIntervals={disabledDays()}
					/>
				</li>
			</ul>
		</div>
	);
}

export default ReservationCalendar;
