import logoImg from "/src/assets/logo.png";
import mgGlass from "/src/assets/mgGlass.png";
import Star from "/src/assets/Star.jsx";
import "./Header.css";
import { useRef, useState } from "react";

function Header({ sendDataToParent }) {
	const searchEl = document.getElementsByClassName("search");
	const [searchCoin, setSearchCoin] = useState("");
	const inputRef = useRef();

	function showSearch() {
		// if (searchEl[0].style.width === "0px") {
		searchEl[0].style.width = "17vw";
		// }
		// else {
		// 	searchEl[0].style.width = "0";
		// }
	}

	const findCoin = () => {
		const value = inputRef.current.value;
		setSearchCoin(value);
		sendDataToParent(value);
	};

	return (
		<>
			<div className="header">
				<img className="logo" src={logoImg} />
				<div className="header-right-part">
					<div className="search-container">
						<button
							className="search-button"
							onClick={() => {
								showSearch();
							}}
						>
							<img className="mg-glass" src={mgGlass} />
						</button>
						<input
							ref={inputRef}
							className="search"
							type="text"
							placeholder="Search"
							value={searchCoin}
							onChange={findCoin}
						/>
					</div>
					<div className="watchlist-container">
						<p className="star">
							<Star />
						</p>
						<p className="watchlist">Watchlist</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
