import { useEffect, useRef, useState } from "react";
import "./CountDown.css";

const formatTime = (time) => {
	let days = Math.floor(time / 60 / 60 / 24);
	let hours = Math.floor((time / 60 / 60) % 24);
	let minutes = Math.floor((time / 60) % 60);
	let seconds = Math.floor(time % 60);

	if (days < 10) days = "0" + days;
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	return ` ${days} : ${hours} : ${minutes} : ${seconds}`;
};

const dateHalvingMS = (1837063920000 - Date.now()) / 1000;

function Core() {
	const [countDown, setCountDown] = useState(dateHalvingMS);
	const timerId = useRef();

	useEffect(() => {
		timerId.current = setInterval(() => {
			setCountDown((c) => c - 1);
		}, 1000);

		return () => {
			clearInterval(timerId.current);
		};
	}, []);

	useEffect(() => {
		if (countDown <= 0) {
			clearInterval(timerId.current);
			setTimeout(() => {
				// alert("Bitcoin Reduced Hashrate");
			}, 100);
		}
	}, [countDown]);

	return (
		<div className="countdown-main-box">
			<div className="countdown-box">
				<p className="text">Bitcoin Halving Countdown</p>
				<h2 className="countdown">{formatTime(countDown)}</h2>
				<div className="days-box">
					<p className="days">DAYS</p>
					<p className="days">HOURS</p>
					<p className="days">MINS</p>
					<p className="days">SECS</p>
				</div>

				<p className="text">Halving Date ETA: 19 April 2028 9:00 UTC+1</p>
			</div>
		</div>
	);
}

export default Core;
