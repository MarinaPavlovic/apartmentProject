import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";

function MyProfilePage() {
	const authCtx = useContext(AuthContext);
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const userId = authCtx.id;
	const token = authCtx.token;

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

	return (
		<div>
			<h2>{username}</h2>
		</div>
	);
}

export default MyProfilePage;
