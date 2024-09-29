import Header from "../Header/Header.jsx";
import CountDown from "../CountDown/CountDown.jsx";
import Table from "../Table/Table.jsx";
import Footer from "../Footer/Footer";
import { useState, createContext } from "react";

export const DataFromChildContext = createContext();
function Home() {
	const [dataFromChild, setDataFromChild] = useState("");

	const handleDataFromChild = (data) => {
		setDataFromChild(data);
	};
	return (
		<>
			<Header sendDataToParent={handleDataFromChild} />
			<CountDown />
			<DataFromChildContext.Provider value={dataFromChild}>
				<Table value={dataFromChild} />
			</DataFromChildContext.Provider>
			<Footer />
		</>
	);
}

export default Home;
