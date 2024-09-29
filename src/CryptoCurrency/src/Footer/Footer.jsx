import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<span className="copyright">
			<p>&copy; cryptoCurrency</p>
			<Link
				className="copyright-links"
				to="https://tandrii789.github.io/MyPortfolio/"
			>
				Portfolio
			</Link>
			<Link className="copyright-links" to="/">Contact</Link>
			<p>{year}</p>
		</span>
	);
}

export default Footer;
