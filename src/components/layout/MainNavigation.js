import { Link, useHistory } from "react-router-dom";
import clasess from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-contex";
import { useState } from "react";
import { useEffect } from "react";

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;
	const role = authCtx.role;
	const history = useHistory();
	const [visibility, setVisibility] = useState(false);

	useEffect(() => {
		if (role === "HOST") {
			setVisibility(true);
		}
	}, [role]);

	const logoutHandler = () => {
		authCtx.logout();
		history.push("/");
		setVisibility(false);
	};

	return (
		<header className={clasess.header}>
			<div className={clasess.logo}>Airbnb</div>
			<nav>
				{visibility && (
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
						{isLoggedIn && (
							<li>
								<button onClick={logoutHandler}>Logout</button>
							</li>
						)}
					</ul>
				)}
				{!visibility && (
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
						{isLoggedIn && (
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

						{!isLoggedIn && (
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
