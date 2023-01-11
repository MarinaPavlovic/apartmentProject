import { Route, Switch } from "react-router-dom";
import ApartmentPage from "./pages/Apartments";
import BeachPage from "./pages/Beach";
import SkiingPage from "./pages/Skiing";
import CitiesPage from "./pages/Cities";
import AuthForm from "./components/auth/AuthForm";
import MyApartmentPage from "./pages/MyApartments";
import Layout from "./components/layout/Layout";
import Registration from "./components/auth/Registration";
import ApartmentCard from "./components/apartments/ApartmentCard";
import MyFavoritePage from "./pages/MyFavorite";
import MyProfilePage from "./pages/MyProfile";
import AddApartmentPage from "./pages/AddApartment";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<ApartmentPage />
				</Route>
				<Route path="/beach">
					<BeachPage />
				</Route>
				<Route path="/skiing">
					<SkiingPage />
				</Route>
				<Route path="/cities">
					<CitiesPage />
				</Route>
				<Route path="/favorites">
					<MyFavoritePage />
				</Route>
				<Route path="/auth">
					<AuthForm />
				</Route>
				<Route path="/registration">
					<Registration />
				</Route>
				<Route path="/apartmentCard">
					<ApartmentCard />
				</Route>
				<Route path="/myProfile">
					<MyProfilePage />
				</Route>

				<Route path="/myApartments">
					<MyApartmentPage />
				</Route>

				<Route path="/myReservations">
					<h2>My Reservations</h2>
				</Route>
				<Route path="/addApartment">
					<AddApartmentPage />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
