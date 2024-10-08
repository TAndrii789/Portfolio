import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import NotFound from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import AboutCoin from "../Pages/AboutCoin/AboutCoin";
import Header from "../Header/Header";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
	{
		path: "/Portfolio/CryptoCurrency/index.html",
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: "home",
				element: <Home />,
			},
			{
				path: ":id",
				element: <AboutCoin />,
			},
		],
	},
]);
