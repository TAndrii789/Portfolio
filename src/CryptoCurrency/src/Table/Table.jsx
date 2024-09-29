import "./Table.css";
import DataFetching from "/src/DataFetching/DataFetching.jsx";

function Table() {

	return (
		<div className="table-box">
			<div className="table">
				<header>
					<p>Rank</p>
					<p>Name</p>
					<p>Price</p>
					<p>24H Chane</p>
					<p>Market Cap</p>
					<p>24H Volume</p>
				</header>
					<DataFetching />
			</div>
		</div>
	);
}

export default Table;


