import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { useState } from "react";

function App() {
	const [dataAboutCoin, setDataAboutCoin] = useState("");


	return <RouterProvider router={router} value={dataAboutCoin} />;
}

export default App;
