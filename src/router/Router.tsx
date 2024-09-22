import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import App from "../CryptoCurrency/src/App";
// import Numpuz from "../Numpuz/script"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		// errorElement: <NotFound />,
		children: [
			// {
			// 	index: true,
			// 	element: <Home />,
			// },
			{
				path: "/CryptoCurrency",
				element: <App />,
			},
			{
				path: "/Numpuz",
				// element: <Numpuz />,
			},
			{
				path: "/Find-a-Pair",
				element: <App />,
			},
		],
	},
]);
