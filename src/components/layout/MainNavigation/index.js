import { Link, useHistory } from "react-router-dom";
import clasess from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../../store/auth-contex";

const MainNavigation = () => {
	const user = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		user.logout();
		history.push("/");
	};

	return (
		<header className={clasess.header}>
			<div className={clasess.logo}>Airbnb</div>
			<nav>
				{user.role === "HOST" && (
					<ul>
						<li>
							<Link to="/myApartments">My Apartments</Link>
						</li>
						<li>
							<Link to="/myReservations">My Reservations</Link>
						</li>
						<li>
							<Link to="/addApartment">Add Apartment</Link>
						</li>
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					</ul>
				)}
				{user.role !== "HOST" && (
					<ul>
						<li>
							<Link to="/">Apartments</Link>
						</li>
						<li>
							<Link to="/beach">Beach</Link>
						</li>
						<li>
							<Link to="/skiing">Skiing</Link>
						</li>
						<li>
							<Link to="/cities">Cities</Link>
						</li>
						{user.isLoggedIn && (
							<ul>
								<li>
									<Link to="/favorites">My Favorites</Link>
								</li>

								<li>
									<Link to="/myProfile">My Profile</Link>
								</li>

								<li>
									<button onClick={logoutHandler}>Logout</button>
								</li>
							</ul>
						)}
						{!user.isLoggedIn && (
							<li className={clasess.login}>
								<Link to="/auth">Login</Link>
							</li>
						)}
					</ul>
				)}
			</nav>
		</header>
	);
};

export default MainNavigation;
