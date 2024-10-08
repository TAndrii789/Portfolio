import "./Login.css";
import logoImg from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginFormComponent = ({
	email,
	setEmail,
	password,
	setPassword,
	confPassword,
	setConfPassword,
	signUp,
	handleSubmit,
	handleAuth,
	info,
}) => (
	<div className="form-container">
		<form className="loginForm" onSubmit={handleSubmit}>
			<h1>Hello there!</h1>
			<input
				type="email"
				name="email"
				id="email"
				className="emailInput"
				placeholder="Email"
				autoComplete="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				name="password"
				id="password"
				className="passwordInput"
				placeholder="Password"
				autoComplete="current-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{signUp && (
				<input
					type="password"
					name="confPassword"
					id="confPassword"
					className="passwordInput"
					placeholder="Confirm Password"
					autoComplete="current-password"
					value={confPassword}
					onChange={(e) => setConfPassword(e.target.value)}
					required
				/>
			)}
			<p
				id="information"
				className="information"
				style={{ fontSize: "13px", color: "red" }}
			>
				{info}
			</p>
			<button className="submitBtn" id="signIN" type="submit">
				{signUp ? "Sign Up" : "Sign In"}
			</button>
		</form>
		<span className="addition">
			<img className="logo" src={logoImg} alt="logo" />
			<h1>Welcome to login</h1>
			<p>Want to {signUp ? "Sign In" : "Sign Up"}?</p>
			<button
				className="submitBtn"
				id="signUP"
				onClick={handleAuth}
				type="button"
			>
				{signUp ? "Sign In" : "Sign Up"}
			</button>
		</span>
	</div>
);

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [signUp, setSignUp] = useState(false);
	const [info, setInfo] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = { email, password };
		const authType = signUp ? "hash.php" : "dehash.php";

		if (signUp) {
			if (!validateEmail(email)) {
				setInfo("Invalid email");
				return;
			} else if (password.length < 8) {
				setInfo("Password must have at least 8 characters");
				return;
			} else if (password !== confPassword) {
				setInfo("Passwords don't match");
				return;
			}else{
				navigate("home");
			}
		}else{
			if (!validateEmail(email)) {
				setInfo("Invalid email");
				return;
			} else if (password.length < 8) {
				setInfo("Password must have at least 8 characters");
				return;
			}else{
				navigate("home");
			}
		}

		// try {
		// 	const response = await fetch(`http://localhost/project/${authType}`, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(formData),
		// 	});
		// 	const data = await response.json();


		// 	if (data.status === "success") {

		// 		navigate("/home");
		// 	} else {
		// 		setInfo(data.message);

		// 	}
		// } catch (error) {
		// 	setInfo("An error occurred");
		// 	console.error("Error:", error);
		// }
	};

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const handleAuth = () => {
		setSignUp(!signUp);
		setInfo(""); // Clear any previous info messages
	};

	return (
		<div className="loginPage">
			<LoginFormComponent
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				confPassword={confPassword}
				setConfPassword={setConfPassword}
				handleSubmit={handleSubmit}
				handleAuth={handleAuth}
				signUp={signUp}
				info={info}
			/>
		</div>
	);
}

export default Login;
